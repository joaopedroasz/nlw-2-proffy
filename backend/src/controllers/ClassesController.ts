import { Request, Response } from "express";

import convertHourToMinutes from "../utils/convertHourToMinutes";
import database from "../database/connection";

interface ScheduleProps {
  week_day: number;
  from: string;
  to: string;
}

class ClassesController {
  async index(request: Request, response: Response): Promise<Response> {
    const subject = String(request.query.subject);
    const week_day = Number(request.query.week_day);
    const time = String(request.query.time);

    if (!subject || !week_day || !time) {
      return response.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await database("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
          .whereRaw("`class_schedule`.`week_day` = ??", [week_day])
          .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
          .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .select(["classes.*", "users.*"]);

    return response.json(classes);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name, avatar, whatsapp, bio, subject, cost } = request.body;

    const schedule: ScheduleProps[] = request.body.schedule;

    const transaction = await database.transaction();

    try {
      const insertedUserIds = await transaction("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUserIds[0];

      const insertedClassesIds = await transaction("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedClassesIds[0];

      const classSchedule = schedule.map((scheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id,
        };
      });

      await transaction("class_schedule").insert(classSchedule);

      await transaction.commit();

      return response.status(201).json({ deu: "certo" });
    } catch (err) {
      await transaction.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }
}

export default new ClassesController();
