import "./Products.scss";
import { useState } from "react";
import Product from "../Product/Product";
import Paginate from "../Paginate/Paginate";
import { useEffect } from "react";

const Products = (props) => {
  const { cars } = props;

  const [itemOffset, setItemOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  window.addEventListener("resize", function (event) {
    setWindowWidth(event.target.innerWidth);
  });

  const itemsPerPage = windowWidth >= 1000 ? 24 : 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cars.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cars.length / itemsPerPage);

  return (
    <div className="products">
      <div className="products__grid">
        {currentItems.map((car) => (
          <Product key={car.id} car={car} />
        ))}
      </div>
      <Paginate
        itemOffset={itemOffset}
        setItemOffset={setItemOffset}
        pageCount={pageCount}
        itemsPerPage={itemsPerPage}
        cars={cars}
      />
    </div>
  );
};

export default Products;
