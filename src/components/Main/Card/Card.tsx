import "./card.scss";
import head_logo from "../../../resources/book.svg";
import Table from "./table/Table";
import { IPropsSubject } from "../../../additionally/interfaces";
import { memo, useEffect } from 'react';

const Card: React.FC<IPropsSubject> = memo(({ subject }) => {
  useEffect(() => {
    console.log(subject);
    
  }, [subject])
  return (
    <article className="card">
      <div className="card__head">
        <div className="card__head-title">
          <img className="card__head-title-logo" src={head_logo} alt="Книга" />
          <h2 className="card__head-title-text">
            {subject.subjectName}
          </h2>
        </div>
        <ul className="card__list-info">
          <li className="card__list-info-item">
            <span className="card__list-info-title">Группа</span>
            <span className="card__list-info-text">{subject.groupName}</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Курс</span>
            <span className="card__list-info-text">{subject.course}</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Количество курсантов</span>
            <span className="card__list-info-text">{subject.studentsNumber}</span>
          </li>
          <li className="card__list-info-item">
            <span className="card__list-info-title">Семестр</span>
            <span className="card__list-info-text">{subject.semestr}</span>
          </li>
        </ul>
      </div>
      <div className="card__body">
        <Table subject={subject}/>
      </div>
    </article>
  );
});

export default Card;
