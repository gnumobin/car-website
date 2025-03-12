import "./Products.scss";
import Product from "../Product/Product";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";

const Products = (props) => {
  const { cars } = props;

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 24;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cars.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cars.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="products">
      <div className="products__grid">
        {currentItems.map((car) => (
          <Product key={car.id} car={car} />
        ))}
      </div>

      <div className="paginate">
        <p className="paginate__text">
          Página <span>{itemOffset / 24 + 1}</span> de {pageCount}
        </p>
        <ReactPaginate
          breakLabel=""
          nextLabel={
            <ChevronRight
              sx={(itemOffset / 24) + 1 === pageCount ? {...rightIconStyle, color: 'rgba(0,0,0,.4)'} : rightIconStyle}
            />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <ChevronLeft sx={!(itemOffset / 24) ? {...leftIconStyle, color: 'rgba(0,0,0,.4)'} : leftIconStyle} />
          }
          renderOnZeroPageCount={null}
          containerClassName="paginate__paginator"
          pageLinkClassName="pagiante__link"
          pageClassName="paginate__item"
        />
      </div>
    </div>
  );
};

const leftIconStyle = {
  fontSize: '4rem',
  marginRight: '2.5rem',
  cursor:'pointer'
}
const rightIconStyle = {
  fontSize: '4rem',
  cursor:'pointer'
}

export default Products;
