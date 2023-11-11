import "./card.scss";
import head_logo from "../../../resources/book.svg";
import Table from "./Table/Table";

const Card = () => {
  const nameWork = [
    "Лекции",
    "Лабораторные работы",
    "Практические",
    "Семинарские",
    "Зачёт",
  ];

  return (
    <article className="card">
      <div className="card__head">
        <div className="card__head-title">
          <img className="card__head-title-logo" src={head_logo} alt="Книга" />
          <h2 className="card__head-title-text">
            Конкретная авиационная техника (1-37 04 23-23)
          </h2>
        </div>
        <ul className="card__list-info">
          <li className="card__list-info-item">
            <span className="card__list-info-title">Группа</span>
            <span className="card__list-info-text">П120</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Курс</span>
            <span className="card__list-info-text">П120</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Количество курсантов</span>
            <span className="card__list-info-text">П120</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Семестр</span>
            <span className="card__list-info-text">П120</span>
          </li>
        </ul>
      </div>
      <div className="card__body">
        <Table/>
      </div>
    </article>
  );
};

export default Card;
