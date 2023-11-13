import "./table.scss";
import { useEffect, useState, memo } from "react";
import Selector from "./selector/Selector";
import { IPropsSubject } from "../../../../additionally/interfaces";
import iconPlus from "../../../../resources/plus.svg";
import iconAddAll from "../../../../resources/set-all.svg";
import iconDelete from "../../../../resources/delete.svg";
import { useAction } from "../../../../store/hooks/useAction";

const Table: React.FC<IPropsSubject> = memo(({ form, subject }) => {
  const { register, setValue } = form;

  const allStudents: number = +subject.studentsNumber;
  const [nameNewFirstTeacher, setNameNewFirstTeacher] = useState<string>("");
  const [nameNewSecondTeacher, setNameNewSecondTeacher] = useState<string>("");
  const [isStatusGroup, setIsStatusGroup] = useState<boolean>(false);
  const { setGroups, deleteGroups } = useAction();

  useEffect(() => {
    subject.countPodgroups === "2" && setIsStatusGroup(true);
  }, [subject]);

  const setTeacher = (isStatusTeacher: boolean) => {
    let id: string = isStatusTeacher
      ? `${subject.uniqueId}_lectureTeacher`
      : `${subject.uniqueId}_lectureTeacher-2`;
    const firstInput = document.getElementById(id) as HTMLInputElement;
    isStatusTeacher
      ? setNameNewFirstTeacher(firstInput.value)
      : setNameNewSecondTeacher(firstInput.value);
  };

  const addNewGroup = () => {
    setIsStatusGroup(true);
    setGroups(subject.uniqueId);

    setValue(
      `${subject.uniqueId}.countStudents`,
      subject.podgroups[0].countStudents
    );
    setValue(
      `${subject.uniqueId}.countStudents-2`,
      subject.podgroups[1].countStudents
    );
  };

  const deleteGroup = () => {
    setIsStatusGroup(false);
    deleteGroups(subject.uniqueId);
  };

  const changeCountStudents = (event: any, idInput: string) => {
    if (+event.target.value >= allStudents) {
      event.target.value = allStudents - 1;
      setValue(idInput.split("_").join("."), `1`);
    } else if (+event.target.value < 0) {
      event.target.value = `1`;
      setValue(idInput.split("_").join("."), `${allStudents - 1}`);
    } else {
      setValue(
        idInput.split("_").join("."),
        `${allStudents - +event.target.value}`
      );
    }
  };

  const onBlurInput = (event: any, idInput: string) => {
    if (+event.target.value === 0) {
      event.target.value = `1`;
      setValue(idInput.split("_").join("."), allStudents - 1 + "");
    }
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
              id={`${subject.uniqueId}_lectureTeacher`}
              className={subject.uniqueId}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
              form={form}
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
              id={`${subject.uniqueId}_lectureTeacher-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
              form={form}
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
            id={`${subject.uniqueId}_laboratoryTeacher`}
            className={subject.uniqueId}
            nameNewTeacher={nameNewFirstTeacher}
            setNameNewTeacher={setNameNewFirstTeacher}
            nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            form={form}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.laboratoryHours === "0"}
              id={`${subject.uniqueId}_laboratoryTeacher-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
              form={form}
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
            form={form}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.practicHours === "0"}
              id={`${subject.uniqueId}_practic-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 2" : ""}
              form={form}
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
            id={`${subject.uniqueId}_seminarTeacher`}
            className={subject.uniqueId}
            nameNewTeacher={nameNewFirstTeacher}
            setNameNewTeacher={setNameNewFirstTeacher}
            nameSelector={isStatusGroup ? "Погруппа 1" : ""}
            form={form}
          />
          {isStatusGroup && (
            <Selector
              isStatus={subject.seminarHours === "0"}
              id={`${subject.uniqueId}_seminarTeacher-2`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewSecondTeacher}
              setNameNewTeacher={setNameNewSecondTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
              form={form}
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
              id={`${subject.uniqueId}_offsetTeacher`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewFirstTeacher}
              setNameNewTeacher={setNameNewFirstTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
              form={form}
            />
            {isStatusGroup && (
              <Selector
                isStatus={false}
                id={`${subject.uniqueId}_offsetTeacher-2`}
                className={subject.uniqueId}
                nameNewTeacher={nameNewSecondTeacher}
                setNameNewTeacher={setNameNewSecondTeacher}
                nameSelector={isStatusGroup ? "Погруппа 2" : ""}
                form={form}
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
              id={`${subject.uniqueId}_examTeacher`}
              className={subject.uniqueId}
              nameNewTeacher={nameNewFirstTeacher}
              setNameNewTeacher={setNameNewFirstTeacher}
              nameSelector={isStatusGroup ? "Погруппа 1" : ""}
              form={form}
            />
            {isStatusGroup && (
              <Selector
                isStatus={false}
                id={`${subject.uniqueId}_examTeacher-2`}
                className={subject.uniqueId}
                nameNewTeacher={nameNewSecondTeacher}
                setNameNewTeacher={setNameNewSecondTeacher}
                nameSelector={isStatusGroup ? "Погруппа 2" : ""}
                form={form}
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
          <input
            {...register(`${subject.uniqueId}.countStudents`, {
              onBlur: (event: any) =>
                onBlurInput(event, `${subject.uniqueId}_countStudents-2`),
              onChange: (event: any) =>
                changeCountStudents(
                  event,
                  `${subject.uniqueId}_countStudents-2`
                ),
            })}
            id={`${subject.uniqueId}_countStudents`}
            className="table__input"
            type="number"
            defaultValue={subject.podgroups[0].countStudents}
          />

          {subject.countPodgroups === "2" && (
            <input
              {...register(`${subject.uniqueId}.countStudents-2`, {
                onBlur: (event: any) =>
                  onBlurInput(event, `${subject.uniqueId}_countStudents`),
                onChange: (event: any) =>
                  changeCountStudents(
                    event,
                    `${subject.uniqueId}_countStudents`
                  ),
              })}
              id={`${subject.uniqueId}_countStudents-2`}
              className="table__input"
              type="number"
              defaultValue={subject.podgroups[1].countStudents}
            />
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
            {...register(`${subject.uniqueId}.additionalInfo`)}
            id={`id_${subject.uniqueId}_textarea`}
            className="table__textarea"
          ></textarea>
        </div>
      </div>
    </section>
  );
});

export default Table;
