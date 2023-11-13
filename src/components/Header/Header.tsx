import "./header.scss";
import logotype from "../../resources/logotype.svg";
import { memo } from "react";

const Header = memo(() => {
  return (
    <header>
      <div className="header__container">
        <img className="header__container-logotype" src={logotype} alt="" />
        <h2 className="header__container-title">
          Белорусская государственная академия авиации
        </h2>
      </div>
    </header>
  );
});

export default Header;
