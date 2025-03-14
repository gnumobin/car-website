import "./SideNav.scss";

const SideNav = () => {
  return (
    <nav className="side-nav">
      <strong className="side-nav__product-name">TOYOTA</strong>
      <h3 className="side-nav__heading-tertiary">SW4 DIAMOND</h3>

      <ul className="side-nav__list">
        <li className="side-nav__item">
          <a href="#" className="side-nav__link">
            Imagens
          </a>
        </li>
        <li className="side-nav__item">
          <a href="#" className="side-nav__link side-nav__link--active">
            Ficha técnica
          </a>
        </li>
        <li className="side-nav__item side-nav__item--active">
          <a href="#" className="side-nav__link">
            Detalhes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
