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
  const [brand, setBrand] = useState("");
  const [armor, setArmor] = useState(null);

  const {
    data: cars,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["cars", pageNumber, submitManager],
    queryFn: () => getCars(pageNumber, year, price, kilometer, brand, armor),
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
                brand={brand}
                setBrand={setBrand}
                armor={armor}
                setArmor={setArmor}
              />
            </aside>
            <div className="products-container__products">
              {cars.total ? (
                <Products
                  cars={cars}
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                />
              ) : (
                <div className="refresh-box">
                  <p className="refresh-box__text">
                    Hey <b>mate</b>! <br /> There is nothing for <b>you</b>{" "}
                    here. now <b>get out</b>!
                  </p>
                  {/* <button className="refresh-box__btn" onClick={refetch}>Refresh</button> */}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <CTAForm />
      <Footer />
    </main>
  );
};

const getCars = async (pageNumber, year, price, kilometer, brand, armor) => {
  const localYear = {
    start: year.start ? +year.start : 0,
    end: year.end ? +year.end : 5000,
  };

  const localPrice = {
    start: price.start ? +price.start : 1,
    end: price.end ? +price.end : 99999999,
  };

  const localKilometer = {
    start: kilometer.start ? +kilometer.start : 0,
    end: kilometer.end ? +kilometer.end : 1000,
  };

  const API_KEY = "https://api-cars.abolfazlrabiei.ir/api/cars?page=";
  const API_RQ = `${API_KEY}${pageNumber}&min_year=${localYear.start}&max_year=${localYear.end}&min_price=${localPrice.start}&max_price=${localPrice.end}&min_speed=${localKilometer.start}&max_speed=${localKilometer.end}&make=${brand}`;
  let response = "";

  console.log(Boolean(armor));

  if (Boolean(armor)) {
    response = await axios.get(API_RQ + `&is_bulletproof=${armor}`);
    return response.data;
  }

  response = await axios.get(API_RQ);

  return response.data;
};

export default ProductsPage;
