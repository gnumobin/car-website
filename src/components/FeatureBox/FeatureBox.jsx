import './FeatureBox.scss';

const FeatureBox = _ => {
    return <div className="feature-container">
        <div className="feature-box">
            <span className='feature-box__sub-heading'>MOTOR</span>
            <strong className='feature-box__heading'>2.8 4 CILINDROS</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>CV</span>
            <strong className='feature-box__heading'>204CV</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>TORQUE</span>
            <strong className='feature-box__heading'>50,9KGFM</strong>
        </div>
        {/* Column */}
        <div className="feature-box">
            <span className='feature-box__sub-heading'>TRANSMISSÃO</span>
            <strong className='feature-box__heading'>AUTOMÁTICA DE 6 
            VELOCIDADES</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>TRAÇÃO</span>
            <strong className='feature-box__heading'>INTEGRAL</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>0-100KM/H</span>
            <strong className='feature-box__heading'>11,8S</strong>
        </div>
        {/* Column */}
        <div className="feature-box">
            <span className='feature-box__sub-heading'>VELOCIDADE MÁXIMA</span>
            <strong className='feature-box__heading'>180KM/H</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>COR</span>
            <strong className='feature-box__heading'>BRANCO LUNAR</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>BANCOS</span>
            <strong className='feature-box__heading'>COURO CARAMELO</strong>
        </div>
        {/* Column */}
        <div className="feature-box">
            <span className='feature-box__sub-heading'>LUGARES</span>
            <strong className='feature-box__heading'>7</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>COMBUSTÍVEL</span>
            <strong className='feature-box__heading'>DIESEL</strong>
        </div>
        <div className="feature-box">
            <span className='feature-box__sub-heading'>PORTA-MALAS</span>
            <strong className='feature-box__heading'>500L</strong>
        </div>
    </div>
}

export default FeatureBox;