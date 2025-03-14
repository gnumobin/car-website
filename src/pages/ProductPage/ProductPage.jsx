import './ProductPage.scss'
import ProductHero from '../../components/ProductHero/ProductHero';
import CTAForm from '../../components/CTAForm/CTAForm';
import Footer from '../../components/Footer/Footer';
import FeatureBox from '../../components/FeatureBox/FeatureBox';
import SideNav from '../../components/SideNav/SideNav';
import DescriptionBox from '../../components/DescriptioBox/DescriptionBox';

const ProductPage = _ => {
    return <section className="section-product">
        <ProductHero />
        <div className="row">
            <SideNav />
            <FeatureBox />
        </div>
        <div className="row">
            <SideNav />
            <DescriptionBox />
        </div>
        {/* <CTAForm />
        <Footer /> */}
    </section>
}

export default ProductPage;