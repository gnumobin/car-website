import CTAForm from "../../components/CTAForm/CTAForm";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import "./ProductsPage.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import SearchForm from "../../components/SearchForm/SearchForm";

const ProductsPage = (_) => {
  
  const { data: cars, isPending } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  return (
    <main className="section-products">
      <section className="products-container">
        <h1 className="products-container__heading">Nossos modelos</h1>
        <div className="products-container__grid">
          <aside>
            <SearchForm />
          </aside>
          <div className="products-container__products">
            {isPending ? <Loading /> : <Products cars={cars} />}
          </div>
        </div>
      </section>
      <CTAForm />
      <Footer />
    </main>
  );
};

const getCars = async (_) => {
  const response = axios.get("https://api-cars.abolfazlrabiei.ir/api/cars");
  return (await response).data;
};

export default ProductsPage;
