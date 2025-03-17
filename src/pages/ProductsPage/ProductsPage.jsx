import CTAForm from "../../components/CTAForm/CTAForm";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import "./ProductsPage.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useState } from "react";
import { useEffect } from "react";

const ProductsPage = () => {

  const [pageNumber, setPageNumber] = useState(1);

  const { data: cars, isPending } = useQuery({
    queryKey: ["cars", pageNumber],
    queryFn: () => getCars(pageNumber),
  });

  const submitSearchHandle = (year, value, kilometer, e) => {
    e.preventDefault();

    setIsSubmit(true);

  };


  return (
    <main className="section-products">
      <section className="products-container">
        <h1 className="products-container__heading">Nossos modelos</h1>
        {isPending ? (
          <Loading />
        ) : (
          <div className="products-container__grid">
            <aside>
              <SearchForm cars={cars} submitSearchHandle={submitSearchHandle} />
            </aside>
            <div className="products-container__products">
              <Products cars={cars} setPageNumber={setPageNumber} pageNumber={pageNumber}/>
            </div>
          </div>
        )}
      </section>
      <CTAForm />
      <Footer />
    </main>
  );
};

const getCars = async (pageNumber) => {
  const response = await axios.get("https://api-cars.abolfazlrabiei.ir/api/cars?page="+pageNumber);
  console.log(response.data)
  return response.data;
};

export default ProductsPage;
