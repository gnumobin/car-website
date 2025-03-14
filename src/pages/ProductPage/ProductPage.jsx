import './ProductPage.scss'
import ProductHero from '../../components/ProductHero/ProductHero';
import CTAForm from '../../components/CTAForm/CTAForm';
import Footer from '../../components/Footer/Footer';
import FeatureBox from '../../components/FeatureBox/FeatureBox';
import SideNav from '../../components/SideNav/SideNav';

const ProductPage = _ => {
    return <section className="section-product">
        <ProductHero />
        <div className="row">
            <SideNav />
            <FeatureBox />
        </div>
        <CTAForm />
        <Footer />
    </section>
}

export default ProductPage;