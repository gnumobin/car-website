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
  const [isSubmit, setIsSubmit] = useState(false);
  const [year, setYear] = useState({ start: "2020", end: "2025" });
  const [value, setValue] = useState({ start: "10", end: "200000" });
  const [kilometer, setKilometer] = useState({ start: "", end: "" });

  const { data: cars, isPending } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
    select: (data) => {
      return data.filter((car) => {

        // console.log((car.year >= year.start && car.year <= year.end) && (car.price >= value.start && car.price <= value.end) && (car.max_speed >= kilometer.start && car.max_speed <= kilometer.end))
        // console.log(car.max_speed)

        // console.log(isSubmit ? "hi" : "bye");
        return (car.year >= year.start && car.year <= year.end) && (car.price >= value.start && car.price <= value.end);
      });
      return data;
    },
  });

  const submitSearchHandle = (year, value, kilometer, e) => {
    e.preventDefault();

    setIsSubmit(true);

    setYear(year)
    setValue(value)
    setKilometer(kilometer)

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
              <Products cars={cars} />
            </div>
          </div>
        )}
      </section>
      <CTAForm />
      <Footer />
    </main>
  );
};

const getCars = async () => {
  const response = axios.get("https://api-cars.abolfazlrabiei.ir/api/cars");
  return (await response).data;
};

export default ProductsPage;
