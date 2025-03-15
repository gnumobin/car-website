import "./ProductHero.scss";
import HeroImg from "../../assets/img/hero.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductHero = ({ car: { name, max_speed, price, year, motor }}) => {
  return (
    <section className="section-info-hero">
      <div className="info-hero">
        <div className="info-hero__content-box">
          <h2 className="info-hero__heading">
            <p className="info-hero__heading--secondary">{name}</p>
            <p className="info-hero__heading--primary">{motor}</p>
          </h2>
          <span className="info-hero__year">{year}</span>
          <span className="info-hero__kilometer">{max_speed}</span>
          <p className="info-hero__price">
            <span>R$</span> {price}
          </p>
          <button className="info-hero__btn">Entrar em contato</button>
        </div>
        <div className="info-hero__img-box">
          <img
            src={HeroImg}
            alt="a picture of some car"
            className="info-hero__img"
          />
        </div>
      </div>
      <p align="center">
        <a href="#pictureBox">
          <ExpandMoreIcon
            sx={{ fontSize: "4.8rem", color: "rgba(0,0,0,.5)" }}
          />
        </a>
      </p>
    </section>
  );
};

export default ProductHero;
