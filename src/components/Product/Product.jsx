import './Product.scss'
import ProductImg from '../../assets/img/product.png'

const Product = _ => {
    return <figure className='product'>
        <img src={ProductImg} alt="a picture of product" className='product__img'/>
        <figcaption className='product__content-box'>
            <div className='product__heading'>
                <h4 className='product__title'></h4>
                <span className='product__date'></span>
            </div>
            <p className='product__price'>
                <span>R$</span> <strong>390.000,00</strong>
            </p>
        </figcaption>
    </figure>
}

export default Product;