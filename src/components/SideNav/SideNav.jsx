import "./SideNav.scss";

const SideNav = ({ active, car: { name, motor } }) => {
  const isActive = (number) =>
    active == number
      ? "side-nav__item side-nav__item--active"
      : "side-nav__item";

  return (
    <nav className="side-nav">
      <strong className="side-nav__product-name">{name}</strong>
      <h3 className="side-nav__heading-tertiary">{motor}</h3>

      <ul className="side-nav__list">
        <li className={isActive(0)}>
          <a href="#pictureBox" className="side-nav__link">
            Imagens
          </a>
        </li>
        <li className={isActive(1)}>
          <a href="#featureBox" className="side-nav__link">
            Ficha técnica
          </a>
        </li>
        <li className={isActive(2)}>
          <a href="#description" className="side-nav__link">
            Detalhes
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
