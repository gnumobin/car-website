import "./ProductPage.scss";
import ProductHero from "../../components/ProductHero/ProductHero";
import CTAForm from "../../components/CTAForm/CTAForm";
import Footer from "../../components/Footer/Footer";
import FeatureBox from "../../components/FeatureBox/FeatureBox";
import SideNav from "../../components/SideNav/SideNav";
import DescriptionBox from "../../components/DescriptioBox/DescriptionBox";
import PictureBox from "../../components/PictureBox/PictureBox";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const ProductPage = () => {
  const { id } = useParams();

  const { data: car, isPending } = useQuery({
    queryKey: ["car"],
    queryFn: getCar.bind(this, id),
  });

  if (isPending) {
    return (
      <section className="section-product">
        <Loading />
      </section>
    );
  } else {
    return (
      <section className="section-product">
        <ProductHero car={car} />
        <div className="row">
          <SideNav active={0} car={car} />
          <PictureBox car={car} />
        </div>
        <div className="row">
          <SideNav active={1} car={car} />
          <FeatureBox car={car} />
        </div>
        <div className="row">
          <SideNav active={2} car={car} />
          <DescriptionBox car={car} />
        </div>
        <CTAForm car={car} />
        <Footer car={car} />
      </section>
    );
  }
};

const getCar = async (id) => {
  const response = axios.get(
    "https://api-cars.abolfazlrabiei.ir/api/cars/" + id
  );
  return (await response).data;
};

export default ProductPage;
