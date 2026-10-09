import ellipse1 from "../assets/Ellipse 1.png";
import ellipse3 from "../assets/Ellipse 3.png";
import joao from "../assets/joao.jpg";
import brayan from "../assets/brayan.jpg";
import logo from "../assets/Logo Golpe no Golpe.png";
import "./About.css";

const members = [
  { name: "Enzo Salles", photo: ellipse1 },
  { name: "Henrique Bicudo", photo: ellipse3 },
  { name: "João Gabriel", photo: joao },
  { name: "Brayan Pereira", photo: brayan },
];

export default function About() {
  return (
    <div className="section">
      <div className="about__header">
        <h1 className="about__title">Conheça nosso time</h1>
      </div>

      <div className="about__members">
        {members.map((member) => (
          <div className="card about__member" key={member.name}>
            <img src={member.photo} alt={member.name} />
            <p className="about__member-name">{member.name}</p>
          </div>
        ))}
      </div>

      <div className="card about__text">
        <p>
          Nosso time de universitários criou esse jogo com o objetivo de
          ajudar as pessoas a fugirem de golpes online, aprendendo de uma
          maneira simples e divertida.
          <br />
          <br />
          Assim nasceu o golpe no golpe® — uma plataforma fácil e gratuita
          para que todos aprendam e possam até ensinar outras pessoas.
        </p>
      </div>

      <div className="about__logo">
        <img src={logo} alt="Golpe no Golpe" />
      </div>
    </div>
  );
}
