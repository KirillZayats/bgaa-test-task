import "./table.scss";
import iconPlus from "../../../../resources/plus.svg";
import iconAddAll from "../../../../resources/set-all.svg";
import { useState } from "react";
import Selector from "./Selector/Selector";

const Table = () => {
  const teachers = ["Вакансия", "петя баночкин", "вася пупкин"];
  const [value, setValue] = useState<string | null>(teachers[0]);

  return (
    <section className="table">
      <div className="table__item table__head">
        <div className="table__container table__task">
          <span>Занятие</span>
        </div>
        <div className="table__container table__hours">
          <span>Часы</span>
        </div>
        <div className="table__container table__teacher">
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
        <div className="table__container table__task">
          <span>Лекции</span>
        </div>
        <div className=" table__container table__hours">
          <span>22</span>
        </div>
        <div className="table__container table__teacher table__teacher__set-all">
          <Selector teachers={teachers} />
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
        <div className="table__container table__task">
          <span>Лабораторные работы</span>
        </div>
        <div className="table__container table__hours">
          <span>0</span>
        </div>
        <div className="table__container table__teacher">
          <Selector teachers={teachers} />
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task table__item__bigger-mobile">
          <span>Практические</span>
        </div>
        <div className="table__container table__hours table__item__no-active-mobile">
          <span></span>
        </div>
        <div className="table__container table__teacher">
          <Selector teachers={teachers} />
        </div>
      </div>
      <div className="table__item table__foot">
        <div className="table__container table__task table__item__bigger-mobile">
          <span>Примечание</span>
          <span className="table__task__small ">
            (для составления расписания)
          </span>
        </div>
        <div className="table__container table__hours table__item__no-active-mobile">
          <span></span>
        </div>
        <div className="table__container table__teacher">
          <textarea name="" id="" className="table__textarea"></textarea>
        </div>
      </div>
    </section>
  );
};

export default Table;
