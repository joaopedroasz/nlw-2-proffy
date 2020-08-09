import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";

import api from "../../services/api";

import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const [subject, setSubject] = useState<string>("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  async function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    const response = await api.post("classes", {
      name,
      avatar,
      whatsapp,
      subject,
      cost: Number(cost),
      bio,
      schedule: scheduleItems,
    });

    if (response.status !== 201) {
      alert("Deu errado!");
    } else {
      alert("Deu certo!");

      history.push("/");
    }
  }

  function setScheduleValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) =>
      index === position ? { ...scheduleItem, [field]: value } : scheduleItem
    );

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição:"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo:"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              name="avatar"
              label="Avatar:"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />

            <Input
              name="whatsapp"
              label="WhatsApp:"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />

            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria:"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
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

            <Input
              name="cost"
              label="Custo da sua aula por hora:"
              type="number"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="time"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  firstOption="Selecione o dia:"
                  onChange={(e) =>
                    setScheduleValue(index, "week_day", e.target.value)
                  }
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
                  name="from"
                  value={scheduleItem.from}
                  onChange={(e) =>
                    setScheduleValue(index, "from", e.target.value)
                  }
                  label="Das"
                  type="time"
                />

                <Input
                  name="to"
                  value={scheduleItem.to}
                  onChange={(e) =>
                    setScheduleValue(index, "to", e.target.value)
                  }
                  label="Até"
                  type="time"
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
