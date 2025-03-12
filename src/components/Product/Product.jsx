import './Product.scss'
import ProductImg from '../../assets/img/product.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router';


const Product = ({car}) => {
    const {name, max_speed, price, year, main_image} = car;

    return <figure className='product'>
        <img src={ProductImg} alt="a picture of product" className='product__img'/>
        <figcaption className='product__content-box'>
            <div className='product__head-box'>
                <h4 className='product__title'>{name}</h4>
                <span className='product__date'>{year} | {max_speed}</span>
            </div>
            <p className='product__price'>
                <span>R$</span> <strong>{price}</strong>
            </p>
            <div className="product__external">
               <Link> 
                <ChevronRightIcon 
                sx={{ fontSize: '3rem', color: 'rgba(0,0,0,.5)' }}/>
               </Link>

               <div className="product__btns">
                <button className='secondary'>HÍBRIDO</button>
                <button className='primary'>BLINDADO</button>
               </div>
            </div>
        </figcaption>
    </figure>
}

export default Product;