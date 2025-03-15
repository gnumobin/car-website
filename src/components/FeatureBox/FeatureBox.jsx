import "./FeatureBox.scss";

const FeatureBox = ({ car }) => {
  const {
    seats,
    motor,
    torque,
    zero_to_hundred,
    fuel,
    max_speed,
    color,
    trunk_space,
    interior,
    traction
  } = car;
  return (
    <div className="feature-container" id="featureBox">
      <div className="feature-box">
        <span className="feature-box__sub-heading">MOTOR</span>
        <strong className="feature-box__heading">{motor}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">CV</span>
        <strong className="feature-box__heading">204CV</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">TORQUE</span>
        <strong className="feature-box__heading">{torque}</strong>
      </div>
      {/* Column */}
      <div className="feature-box">
        <span className="feature-box__sub-heading">TRANSMISSÃO</span>
        <strong className="feature-box__heading">
          AUTOMÁTICA DE 6 VELOCIDADES
        </strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">TRAÇÃO</span>
        <strong className="feature-box__heading">{traction}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">0-100KM/H</span>
        <strong className="feature-box__heading">{zero_to_hundred}</strong>
      </div>
      {/* Column */}
      <div className="feature-box">
        <span className="feature-box__sub-heading">VELOCIDADE MÁXIMA</span>
        <strong className="feature-box__heading">{max_speed}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">COR</span>
        <strong className="feature-box__heading">{color}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">BANCOS</span>
        <strong className="feature-box__heading">{interior}</strong>
      </div>
      {/* Column */}
      <div className="feature-box">
        <span className="feature-box__sub-heading">LUGARES</span>
        <strong className="feature-box__heading">{seats}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">Fuel</span>
        <strong className="feature-box__heading">{fuel}</strong>
      </div>
      <div className="feature-box">
        <span className="feature-box__sub-heading">PORTA-MALAS</span>
        <strong className="feature-box__heading">{trunk_space}</strong>
      </div>
    </div>
  );
};

export default FeatureBox;
