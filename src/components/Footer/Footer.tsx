import "./footer.scss";
import { memo } from 'react';
const Footer = memo(() => {
  return (
    <footer>
      <div className="footer__container">
        <p className="footer__container-text">
        © Все права защищены. Сделал Заяц Кирилл
        </p>
      </div>
    </footer>
  );
});

export default Footer;
