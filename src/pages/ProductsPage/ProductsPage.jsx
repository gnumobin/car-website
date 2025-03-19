import CTAForm from "../../components/CTAForm/CTAForm";
import Footer from "../../components/Footer/Footer";
import Products from "../../components/Products/Products";
import "./ProductsPage.scss";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import SearchForm from "../../components/SearchForm/SearchForm";
import { useState } from "react";

const ProductsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const [submitManager, setSubmitManager] = useState(false);
  // Form inputs
  const [year, setYear] = useState({ start: "", end: "" });
  const [price, setPrice] = useState({ start: "", end: "" });
  const [kilometer, setKilometer] = useState({ start: "", end: "" });

  const { data: cars, isPending } = useQuery({
    queryKey: ["cars", pageNumber, submitManager],
    queryFn: () => getCars(pageNumber),
  });

  return (
    <main className="section-products">
      <section className="products-container">
        <h1 className="products-container__heading">Nossos modelos</h1>
        {isPending ? (
          <Loading />
        ) : (
          <div className="products-container__grid">
            <aside>
              <SearchForm
                cars={cars}
                year={year}
                setYear={setYear}
                price={price}
                setPrice={setPrice}
                kilometer={kilometer}
                setKilometer={setKilometer}
                submitManager={submitManager}
                setSubmitManager={setSubmitManager}
              />
            </aside>
            <div className="products-container__products">
              <Products
                cars={cars}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
              />
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
  const response = await axios.get(
    "https://api-cars.abolfazlrabiei.ir/api/cars?page=" + pageNumber
  );
  console.log("run!");
  return response.data;
};

export default ProductsPage;
