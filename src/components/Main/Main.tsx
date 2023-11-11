import Card from "./Card/Card";
import "./main.scss";

const Main = () => {
  return (
    <main>
      <ul className="card-list">
        <li className="card-list__item">
          <Card />
        </li>
        <li className="card-list__item">
          <Card />
        </li>
        <li className="card-list__item">
          <Card />
        </li>
      </ul>
    </main>
  );
};

export default Main;
