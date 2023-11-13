import { ISubject } from "../../additionally/interfaces";
import { useTypeSelector } from "../../store/hooks/useTypeSelector";
import { RootState } from "../../store/reducers";
import Card from "./card/Card";
import "./main.scss";
import { useState, useEffect, memo } from "react";

const Main = memo(() => {
  const { subjects } = useTypeSelector((state: RootState) => state.data);
  const [listSubjects, setListSubjects] = useState<ISubject[]>([]);

  useEffect(() => {
    setListSubjects([...subjects]);
  }, [subjects]);
  return (
    <main>
      <ul className="card-list">
        {listSubjects &&
          listSubjects.length > 0 &&
          listSubjects.map((item: ISubject) => (
            <li key={item.uniqueId} className="card-list__item">
              <Card subject={item} />
            </li>
          ))}
      </ul>
    </main>
  );
});

export default Main;
