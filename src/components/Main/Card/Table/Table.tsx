import "./table.scss";
import iconPlus from "../../../../resources/plus.svg";
import iconAddAll from "../../../../resources/set-all.svg";
import { useState } from "react";
import Selector from "./Selector/Selector";
import { IPropsSubject } from "../../../../additionally/interfaces";

const Table: React.FC<IPropsSubject> = ({ subject }) => {

  return (
    <section className="table">
      <div className="table__item table__head">
        <div className="table__container table__task-column">
          <span>Занятие</span>
        </div>
        <div className="table__container table__hours-column">
          <span>Часы</span>
        </div>
        <div className="table__container table__teacher-column">
          <span>Преподаватель</span>
          <img
            className="table__image-plus"
            src={iconPlus}
            alt="Картинка плюса"
            title="Нажмите чтобы добавить новую группу"
          />
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Лекции</span>
        </div>
        <div className=" table__container table__hours-column">
          <span>{subject.lecturesHours}</span>
        </div>
        <div className="table__container table__teacher-column table__teacher__set-all">
          <Selector isStatus={subject.lecturesHours === "0"}/>
          <div className="table__container-image">
          <img
            className="table__image-set-all"
            src={iconAddAll}
            alt="Картинка применить"
            title="Нажмите чтобы применить выбранного переподавателя "
          />
          </div>
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Лабораторные работы</span>
        </div>
        <div className="table__container table__hours-column">
          <span>{subject.laboratoryHours}</span>
        </div>
        <div className="table__container table__teacher-column">
          <Selector isStatus={subject.laboratoryHours === "0"}/>
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Практические</span>
        </div>
        <div className="table__container table__hours-column">
          <span>{subject.practicHours}</span>
        </div>
        <div className="table__container table__teacher-column">
          <Selector isStatus={subject.practicHours === "0"}/>
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Семинарские</span>
        </div>
        <div className="table__container table__hours-column">
          <span>{subject.seminarHours}</span>
        </div>
        <div className="table__container table__teacher-column">
          <Selector isStatus={subject.seminarHours === "0"}/>
        </div>
      </div>
      {
        subject.offset && (
          <div className="table__item table__main-item">
          <div className="table__container table__task table__item__bigger-mobile">
            <span>Зачёт</span>
          </div>
          <div className="table__container table__hours table__item__no-active-mobile">
          </div>
          <div className="table__container table__teacher-column">
            <Selector isStatus={false}/>
          </div>
        </div>
        )
      }
      {
        subject.exam && (
          <div className="table__item table__main-item">
          <div className="table__container table__task table__item__bigger-mobile">
            <span>Экзамен</span>
          </div>
          <div className="table__container table__hours table__item__no-active-mobile">
          </div>
          <div className="table__container table__teacher-column">
            <Selector isStatus={false}/>
          </div>
        </div>
        )
      }
      {
        subject.countPodgroups === "2" && (
          <div className="table__item table__main-item">
          <div className="table__container table__task table__item__bigger-mobile">
            <span>Количество человек</span>
          </div>
          <div className="table__container table__hours table__item__no-active-mobile">
          </div>
          <div className="table__container table__teacher-column">
            <span>{subject.podgroups[0].countStudents}</span>
            <span>{subject.podgroups[1].countStudents}</span>
          </div>
        </div>
        )
      }
      <div className="table__item table__foot">
        <div className="table__container table__task table__item__bigger-mobile">
          <span>Примечание</span>
          <span className="table__task__small ">
            (для составления расписания)
          </span>
        </div>
        <div className="table__container table__hours table__item__no-active-mobile">
        </div>
        <div className="table__container table__teacher-column">
          <textarea id={`id_${subject.uniqueId}_textarea`} className="table__textarea"></textarea>
        </div>
      </div>
    </section>
  );
};

export default Table;
