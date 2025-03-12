import "./Products.scss";
import { useState } from "react";
import Product from "../Product/Product";
import Paginate from "../Paginate/Paginate";

const Products = (props) => {
  const { cars } = props;

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 24;
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