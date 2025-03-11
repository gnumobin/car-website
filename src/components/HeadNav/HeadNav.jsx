import { Link } from 'react-router';
// Custom Imports
import './HeadNav.scss'
import Logo from '../../assets/img/logo.png'

const HeadNav = _ => {
    return <nav className="head-nav">
        <div className="head-nav__logo-box">
           <a href="#">
            <img src={Logo} alt="Brand Logo" className='head-nav__logo'/>
           </a>
        </div>
        <ul className="head-nav__list">
            <li className="head-nav__item">
                <Link className='head-nav__link'>Sobre</Link>
            </li>
            <li className="head-nav__item">
                <Link className='head-nav__link'>Contato</Link>
            </li>
            <li className="head-nav__item">
                <Link className='head-nav__link'>Anunciar</Link>
            </li>
            <li className="head-nav__item">
                <Link className='head-nav__link head-nav__link--active'>
                    Estoque
                </Link>
            </li>
        </ul>
    </nav>
}

export default HeadNav;