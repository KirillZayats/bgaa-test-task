import "./table.scss";
import { useEffect, useState, memo } from "react";
import Selector from "./selector/Selector";
import { IPropsSubject } from "../../../../additionally/interfaces";

import iconPlus from "../../../../resources/plus.svg";
import iconAddAll from "../../../../resources/set-all.svg";
import iconDelete from "../../../../resources/delete.svg";
import { useAction } from "../../../../store/hooks/useAction";

const Table: React.FC<IPropsSubject> = memo(({ subject }) => {
  const [nameNewFirstTeacher, setNameNewFirstTeacher] = useState<string>("");
  const [nameNewSecondTeacher, setNameNewSecondTeacher] = useState<string>("");

  const [isStatusGroup, setIsStatusGroup] = useState<boolean>(false);
  const { setGroups, deleteGroups } = useAction();

  useEffect(() => {
    subject.countPodgroups === "2" && setIsStatusGroup(true);
  }, [subject]);

  const setTeacher = (isStatusTeacher: boolean) => {
    let id: string = isStatusTeacher
      ? `${subject.uniqueId}_value-set-all`
      : `${subject.uniqueId}_value-set-all-next`;
    const firstInput = document.getElementById(id) as HTMLInputElement;
    isStatusTeacher
      ? setNameNewFirstTeacher(firstInput.value)
      : setNameNewSecondTeacher(firstInput.value);
  };

  const addNewGroup = () => {
    setIsStatusGroup(true);
    toggleTableHeadTeacher();
    setGroups(subject.uniqueId);
  };

  const deleteGroup = () => {
    setIsStatusGroup(false);
    toggleTableHeadTeacher();
    deleteGroups(subject.uniqueId);
  };

  const toggleTableHeadTeacher = () => {
    toggleClass(
      `${subject.uniqueId}_table-head__teacher`,
      "table__teacher__space-around"
    );
    toggleClass(
      `${subject.uniqueId}_table-head__teacher`,
      "table__teacher__center"
    );
  };

  const toggleClass = (id: string, className: string): void => {
    document.getElementById(id)?.classList.toggle(className);
  };

  return (
    <section className="table">
      <div className="table__item table__head">
        <div className="table__container table__task-column">
          <span>Занятие</span>
        </div>
        <div className="table__container table__hours-column">
          <span>Часы</span>
        </div>
        <div
          id={`${subject.uniqueId}_table-head__teacher`}
          className={`table__container table__teacher-column ${
            isStatusGroup
              ? "table__teacher__space-around"
              : "table__teacher__center"
          }`}
        >
          <div className="table__first-group">
            <span>{isStatusGroup ? "Подгруппа 1" : "Преподаватель"}</span>
            <img
              onClick={addNewGroup}
              id={`${subject.uniqueId}_icon-plus`}
              className={`table__image-plus ${
                isStatusGroup ? "table__image-plus__no-active" : ""
              }`}
              src={iconPlus}
              alt="Картинка плюса"
              title="Нажмите чтобы добавить новую группу"
            />
          </div>
          <div
            className={`table__new-group ${
              isStatusGroup ? `table__new-group__no-active` : ``
            }`}
          >
            <span>Подгруппа 2</span>
            <img
              onClick={deleteGroup}
              id={`${subject.uniqueId}_icon-delete`}
              className="table__image-delete"
              src={iconDelete}
              alt="Картинка карзины"
              title="Нажмите чтобы удалить группу"
            />
          </div>
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Лекции</span>
        </div>
        <div className=" table__container table__hours-column">
          <span>{subject.lecturesHours}</span>
        </div>
        <div
          className={`table__container table__teacher-column table__teacher__more ${
            isStatusGroup
              ? "table__gap-teacher__show"
              : "table__gap-teacher__hidden"
          }`}
        >
          <div className="table__container-selector-first">
            <Selector
              isStatus={subject.lecturesHours === "0"}
              id={`${subject.uniqueId}_value-set-all`}
              className={subject.uniqueId}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            />
            <div
              className="table__container-image"
              onClick={() => setTeacher(true)}
            >
              <img
                className="table__image-set-all"
                src={iconAddAll}
                alt="Картинка применить"
                title="Нажмите чтобы применить выбранного переподавателя "
              />
            </div>
          </div>

          <div
            className={`table__container-selector-second table__item__hidden table__item-width__hidden ${
              isStatusGroup ? "table__item__show table__item-width__show" : ""
            }`}
          >
            <Selector
              isStatus={subject.lecturesHours === "0"}
              id={`${subject.uniqueId}_value-set-all-next`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
            />
            <div
              className="table__container-image"
              onClick={() => setTeacher(false)}
            >
              <img
                className="table__image-set-all"
                src={iconAddAll}
                alt="Картинка применить"
                title="Нажмите чтобы применить выбранного переподавателя "
              />
            </div>
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
        <div
          className={`table__container table__teacher-column table__teacher__more ${
            isStatusGroup
              ? "table__gap-teacher__show"
              : "table__gap-teacher__hidden"
          }`}
        >
          <Selector
            isStatus={subject.laboratoryHours === "0"}
            id={`${subject.uniqueId}_lab`}
            className={subject.uniqueId}
            nameNewTeacher={nameNewFirstTeacher}
            setNameNewTeacher={setNameNewFirstTeacher}
            nameSelector={isStatusGroup ? "Погруппа 1" : ""}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.laboratoryHours === "0"}
              id={`${subject.uniqueId}_lab-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
            />
          )}
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Практические</span>
        </div>
        <div className="table__container table__hours-column">
          <span>{subject.practicHours}</span>
        </div>
        <div
          className={`table__container table__teacher-column table__teacher__more ${
            isStatusGroup
              ? "table__gap-teacher__show"
              : "table__gap-teacher__hidden"
          }`}
        >
          <Selector
            isStatus={subject.practicHours === "0"}
            id={`${subject.uniqueId}_practic`}
            className={subject.uniqueId}
            nameNewTeacher={nameNewFirstTeacher}
            setNameNewTeacher={setNameNewFirstTeacher}
            nameSelector={isStatusGroup ? "Погруппа 1" : ""}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.practicHours === "0"}
              id={`${subject.uniqueId}_practic-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
            />
          )}
        </div>
      </div>
      <div className="table__item table__main-item">
        <div className="table__container table__task-column">
          <span>Семинарские</span>
        </div>
        <div className="table__container table__hours-column">
          <span>{subject.seminarHours}</span>
        </div>
        <div
          className={`table__container table__teacher-column table__teacher__more ${
            isStatusGroup
              ? "table__gap-teacher__show"
              : "table__gap-teacher__hidden"
          }`}
        >
          <Selector
            isStatus={subject.seminarHours === "0"}
            id={`${subject.uniqueId}_seminar`}
            className={subject.uniqueId}
            nameNewTeacher={nameNewFirstTeacher}
            setNameNewTeacher={setNameNewFirstTeacher}
            nameSelector={isStatusGroup ? "Погруппа 1" : ""}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.seminarHours === "0"}
              id={`${subject.uniqueId}_seminar-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            />
          )}
        </div>
      </div>
      {subject.offset && (
        <div className="table__item table__main-item">
          <div className="table__container table__task-column table__item__bigger-mobile">
            <span>Зачёт</span>
          </div>
          <div className="table__container table__hours-column table__item__no-active-mobile">
            <span></span>
          </div>
          <div
            className={`table__container table__teacher-column table__teacher__more ${
              isStatusGroup
                ? "table__gap-teacher__show"
                : "table__gap-teacher__hidden"
            }`}
          >
            <Selector
              isStatus={false}
              id={`${subject.uniqueId}_test`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewFirstTeacher}
              setNameNewTeacher={setNameNewFirstTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            />
            {isStatusGroup && (
              <Selector
                isStatus={false}
                id={`${subject.uniqueId}_test-next`}
                className={subject.uniqueId}
                nameNewTeacher={nameNewSecondTeacher}
                setNameNewTeacher={setNameNewSecondTeacher}
                nameSelector={isStatusGroup ? "Погруппа 2" : ""}
              />
            )}
          </div>
        </div>
      )}
      {subject.exam && (
        <div className="table__item table__main-item">
          <div className="table__container table__task-column table__item__bigger-mobile">
            <span>Экзамен</span>
          </div>
          <div className="table__container table__hours-column table__item__no-active-mobile">
            <span></span>
          </div>
          <div
            className={`table__container table__teacher-column table__teacher__more ${
              isStatusGroup
                ? "table__gap-teacher__show"
                : "table__gap-teacher__hidden"
            }`}
          >
            <Selector
              isStatus={false}
              id={`${subject.uniqueId}_exam`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewFirstTeacher}
              setNameNewTeacher={setNameNewFirstTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            />
            {isStatusGroup && (
              <Selector
                isStatus={false}
                id={`${subject.uniqueId}_exam-next`}
                className={subject.uniqueId}
                nameNewTeacher={nameNewSecondTeacher}
                setNameNewTeacher={setNameNewSecondTeacher}
                nameSelector={isStatusGroup ? "Погруппа 2" : ""}
              />
            )}
          </div>
        </div>
      )}
      <div
        className={`table__item table__main-item table__item__hidden table__item-height__hidden ${
          subject.countPodgroups === "2"
            ? "table__item__show table__item-height__show"
            : ""
        }`}
      >
        <div className="table__container table__task-column table__item__bigger-mobile">
          <span>Количество человек</span>
        </div>
        <div className="table__container table__hours-column table__item__no-active-mobile"></div>
        <div className="table__container table__teacher-column table__groups">
          <span>{subject.podgroups[0].countStudents}</span>
          {subject.countPodgroups === "2" && (
            <span>{subject.podgroups[1].countStudents}</span>
          )}
        </div>
      </div>

      <div className="table__item table__foot">
        <div className="table__container table__task-column table__item__bigger-mobile">
          <span>Примечание</span>
          <span className="table__task__small ">
            (для составления расписания)
          </span>
        </div>
        <div className="table__container table__hours-column table__item__no-active-mobile">
          <span></span>
        </div>
        <div className="table__container table__teacher-column">
          <textarea
            id={`id_${subject.uniqueId}_textarea`}
            className="table__textarea"
          ></textarea>
        </div>
      </div>
    </section>
  );
});

export default Table;
