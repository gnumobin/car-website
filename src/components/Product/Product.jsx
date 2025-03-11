import './Product.scss'
import ProductImg from '../../assets/img/product.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Product = _ => {
    return <figure className='product'>
        <img src={ProductImg} alt="a picture of product" className='product__img'/>
        <figcaption className='product__content-box'>
            <div className='product__head-box'>
                <h4 className='product__title'>TOYOTA SW4 Diamond</h4>
                <span className='product__date'>2023 | 9.141kM</span>
            </div>
            <p className='product__price'>
                <span>R$</span> <strong>390.000,00</strong>
            </p>
            <ChevronRightIcon sx={{ fontSize: '3rem', color: 'rgba(0,0,0,.5)' }}/>
        </figcaption>
    </figure>
}

export default Product;