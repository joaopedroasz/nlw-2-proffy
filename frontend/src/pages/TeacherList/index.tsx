import React, { useState, FormEvent } from "react";
import { FaSearch } from "react-icons/fa";

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import TeachItem from "../../components/TeacherItem/index";

import { TeacherProps } from "../../components/TeacherItem";

import api from "../../services/api";

import "./styles.css";

function TeacherList() {
  const [subject, setSubject] = useState<string>("");
  const [week_day, setWeekDay] = useState<string>("");
  const [time, setTime] = useState<string>("");

  const [teachers, setTeachers] = useState([]);

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            required
            name="subject"
            label="Matéria:"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            firstOption="Selecione uma matéria:"
            options={[
              { value: "Redação", label: "Redação" },
              { value: "Português", label: "Português" },
              { value: "Inglês", label: "Inglês" },
              { value: "Literatura", label: "Literatura" },
              { value: "Filosofia", label: "Filosofia" },
              { value: "Sociologia", label: "Sociologia" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Física", label: "Física" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
            ]}
          />

          <Select
            required
            name="subject"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            firstOption="Selecione o dia:"
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />

          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button type="submit">
            <FaSearch color="#fff" />
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers
          ? teachers.map((teacher: TeacherProps) => (
              <TeachItem key={teacher.id} teacher={teacher} />
            ))
          : "Tudo vazio por aqui! :)"}
      </main>
    </div>
  );
}

export default TeacherList;
