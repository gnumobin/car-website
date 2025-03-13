import './ProductPage.scss'
import Information from '../../components/Information/Information';
import ProductHero from '../../components/ProductHero/ProductHero';
import CTAForm from '../../components/CTAForm/CTAForm';
import Footer from '../../components/Footer/Footer';

const ProductPage = _ => {
    return <section className="section-product">
        <ProductHero />
        <CTAForm />
        <Footer />
    </section>
}

export default ProductPage;