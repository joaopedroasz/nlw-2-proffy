import React from "react";

import api from "../../services/api";

import whatsaapIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

export interface TeacherProps {
  id: number;
  avatar: string;
  bio: string;
  cost: string;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: TeacherProps;
}

const TeachItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  async function createNewConnection() {
    await api.post("connections", {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora:
          <strong>R${teacher.cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${teacher.whatsapp}`}
          onClick={createNewConnection}
        >
          <img src={whatsaapIcon} alt="WhatsApp" />
          Entrar em contato.
        </a>
      </footer>
    </article>
  );
};

export default TeachItem;
