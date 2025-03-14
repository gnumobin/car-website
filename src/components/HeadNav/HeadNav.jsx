import { Link } from "react-router";
// Custom Imports
import "./HeadNav.scss";
import Logo from "../../assets/img/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

const HeadNav = (_) => {
  return (
    <nav className="head-nav">
      <div className="head-nav__logo-box">
        <a href="#">
          <img src={Logo} alt="Brand Logo" className="head-nav__logo" />
        </a>
      </div>
      <input type="checkbox" id="toggleMenu" />
      <label htmlFor="toggleMenu" className="head-nav__toggle">
        <MenuIcon sx={{ fontSize: "4rem" }} />
      </label>
      <ul className="head-nav__list">
        <li className="head-nav__item">
          <Link className="head-nav__link" to={"/"}>
            Sobre
          </Link>
        </li>
        <li className="head-nav__item">
          <Link className="head-nav__link" to={"/product"}>
            Contato
          </Link>
        </li>
        <li className="head-nav__item">
          <Link className="head-nav__link">Anunciar</Link>
        </li>
        <li className="head-nav__item">
          <Link
            className="head-nav__link head-nav__link--active"
            to={"/products"}
          >
            Estoque
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeadNav;
