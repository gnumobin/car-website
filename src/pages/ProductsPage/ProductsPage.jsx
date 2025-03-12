import CTAForm from "../../components/CTAForm/CTAForm";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import "./ProductsPage.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

const ProductsPage = (_) => {
 const {data : cars, isPending} = useQuery({
  queryKey: ['cars'],
  queryFn: getCars
 })

  return (
    <section className="section-products">
      {isPending ? <Loading /> : <Products cars={cars} />}
      <CTAForm />
      <Footer />
    </section>
  );
};

const getCars = async _ => {
  const response = axios.get('https://api-cars.abolfazlrabiei.ir/api/cars')
  return (await response).data
}

export default ProductsPage;