import "./Footer.scss";
import Logo from "../../assets/img/logo.png";
import { Instagram,Facebook,YouTube,WhatsApp,ArrowForward,} from "@mui/icons-material";

const Footer = _ => {
  return <footer className="footer">
      <nav className="footer__nav">
        <div className="footer__social-box">
          <div className="footer__logo-box">
            <a href="#">
              <img src={Logo} alt="Brand Logo" className="footer__logo" />
            </a>
          </div>
          <p className="footer__social-text">
            Qualidade, Segurança, Transparência.
          </p>
          <div className="footer__social-icons">
            <a href="#" className="footer__social-link">
              <Instagram sx={{ fontSize: "2.4rem" }} />
            </a>
            <a href="#" className="footer__social-link">
              <Facebook sx={{ fontSize: "2.4rem" }} />
            </a>
            <a href="#" className="footer__social-link">
              <YouTube sx={{ fontSize: "2.4rem" }} />
            </a>
            <a href="#" className="footer__social-link">
              <WhatsApp sx={{ fontSize: "2.4rem" }} />
            </a>
          </div>
        </div>
        <div className="footer__contact-box">
          <h4 className="footer__contact-heading">Contato</h4>
          <ul className="footer__list">
            <li>
              <a href="#" className="footer__list-link">
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@touringcars.com.br"
                className="footer__list-link"
              >
                contato@touringcars.com.br
              </a>
            </li>
            <li>
              <a href="tel:+81-3512-9411" className="footer__list-link">
                (81) 3512-9411
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__cta">
          <h4 className="footer__cta-heading">Inscreva-se</h4>
          <p className="footer__cta-text">
            Informe seu email para receber asúltimas novidades da Touring Cars.
          </p>
          <form action="#" className="little-cta">
            <input type="text" placeholder="E-mail" className="little-cta__input"/>
            <button className="little-cta__submit">
              <ArrowForward />
            </button>
          </form>
        </div>
      </nav>

      <p className="footer__copyright">©️ 2024 Todos os direitos reservados.</p>
    </footer>
};

export default Footer;
