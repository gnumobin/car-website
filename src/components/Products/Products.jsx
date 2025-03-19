import "./Products.scss";
import { useState } from "react";
import Product from "../Product/Product";
import Paginate from "../Paginate/Paginate";
import { useEffect } from "react";

const Products = (props) => {
  const { cars, setPageNumber, pageNumber, pageSize, setPageSize } = props;

  const [itemOffset, setItemOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setPageSize(windowWidth < 1000 ? 3 : 10);
    window.addEventListener("resize", (e) => {
      setWindowWidth(e.target.innerWidth);
      setPageSize(windowWidth < 1000 ? 3 : 10);
    });
  });

  const itemsPerPage = pageSize;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cars.items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cars.total / itemsPerPage);

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
        cars={cars.items}
        setPageNumber={setPageNumber}
        pageNumber={pageNumber}
      />
    </div>
  );
};

export default Products;
