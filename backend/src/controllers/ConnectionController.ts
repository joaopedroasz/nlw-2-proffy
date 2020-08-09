import { Request, Response } from "express";

import database from "../database/connection";

class ConnectionController {
  async index(request: Request, response: Response): Promise<Response> {
    const totalConnections = await database("connections").count("* as total");

    const { total } = totalConnections[0];

    return response.status(201).json(total);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.body;

    await database("connections").insert({
      user_id,
    });

    return response.status(201).json({ deu: "certo" });
  }
}

export default new ConnectionController();
