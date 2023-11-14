import { IPropsModal } from "../../additionally/interfaces";
import "./modal.scss";

const Modal: React.FC<IPropsModal> = ({ active, setActive, message }) => {
  const closeModal = () => {
    setActive(false);
  };

  return (
    <div className={`modal ${active ? "active" : ""}`}>
      <section
        className={`modal__container ${active ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="modal__text">
          {message ? message : "Идет отправка на сервер!"}
        </p>
        <button className="modal__button" onClick={closeModal}>
          Хорошо
        </button>
      </section>
    </div>
  );
};

export default Modal;
