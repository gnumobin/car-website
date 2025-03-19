import "./Products.scss";
import { useState } from "react";
import Product from "../Product/Product";
import Paginate from "../Paginate/Paginate";

const Products = (props) => {
  const { cars, setPageNumber,pageNumber } = props;

  const [itemOffset, setItemOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  window.addEventListener('resize', e => {
    setWindowWidth(e.target.innerWidth)
  })

  
  const itemsPerPage = windowWidth >= 1000 ? cars.page_size : 3;
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
