import './Information.scss'
import HeroImg from '../../assets/img/hero.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Information = () => {
    return <section className="section-info">
        <div className="info-hero">
            <div className="info-hero__content-box">
                <h2 className='info-hero__heading'>
                    <p className='info-hero__heading--secondary'>TOYOTA</p>
                    <p className='info-hero__heading--primary'>SW4 DIAMOND</p>
                </h2>
                <span className='info-hero__year'>2024/24</span>
                <span className='info-hero__kilometer'>7.587</span>
                <p className='info-hero__price'>
                    <span>R$</span> 390.000,00
                </p>
                <button className='info-hero__btn'>Entrar em contato</button>
            </div>
            <div className="info-hero__img-box">
                <img src={HeroImg} alt="a picture of some car" className='info-hero__img' />
            </div>
        </div>
        <p align='center'>
            <ExpandMoreIcon sx={{fontSize: '4.8rem', color: 'rgba(0,0,0,.5)'}}/>
        </p>
    </section>
}

export default Information;