import { SubmitHandler, useForm } from "react-hook-form";
import { ISubject } from "../../additionally/interfaces";
import { useTypeSelector } from "../../store/hooks/useTypeSelector";
import { RootState } from "../../store/reducers";
import Card from "./card/Card";
import "./main.scss";
import { useState, useEffect, memo } from "react";
import { FieldValues } from "../../additionally/types";
import { useAction } from "../../store/hooks/useAction";

const Main = memo(() => {
  const { subjects } = useTypeSelector((state: RootState) => state.data);
  const { postData } = useAction();
  const [listSubjects, setListSubjects] = useState<ISubject[]>([]);
  const form = useForm<FieldValues>();
  const { handleSubmit } = form;

  useEffect(() => {
    setListSubjects([...subjects]);
  }, [subjects]);

  const onSubmit: SubmitHandler<FieldValues> = (answer: any) => {
    postData(answer, [...subjects])

  }
  return (
    <main>
      <form className="form-container" noValidate onSubmit={handleSubmit(onSubmit)}>
      <ul className="card-list">
        {listSubjects &&
          listSubjects.length > 0 &&
          listSubjects.map((item: ISubject) => (
            <li key={item.uniqueId} className="card-list__item">
              <Card form={form} subject={item} />
            </li>
          ))}
      </ul>
      <button type="submit" className="sumbit-data">Сохранить</button>
      </form>
    </main>
  );
});

export default Main;
