import ReactPaginate from "react-paginate";
import "./Paginate.scss";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Paginate = ({
  itemOffset,
  setItemOffset,
  pageCount,
  itemsPerPage,
  cars,
  setPageNumber,
  pageNumber,
}) => {
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cars.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="paginate">
      <p className="paginate__text">
        Página <span>{pageNumber}</span> de {pageCount}
      </p>
      <ReactPaginate
        breakLabel=""
        nextLabel={
          <ChevronRight
            sx={rightIconStyle}
            onClick={() =>
              setPageNumber(pageNumber < pageCount ? ++pageNumber : pageNumber)
            }
          />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <ChevronLeft
            sx={leftIconStyle}
            onClick={() =>
              setPageNumber(pageNumber > 1 ? --pageNumber : pageNumber)
            }
          />
        }
        renderOnZeroPageCount={null}
        containerClassName="paginate__paginator"
        pageLinkClassName="pagiante__link"
        pageClassName="paginate__item"
      />
    </div>
  );
};

const leftIconStyle = {
  fontSize: "4rem",
  marginRight: "2.5rem",
  cursor: "pointer",
};
const rightIconStyle = {
  fontSize: "4rem",
  cursor: "pointer",
};

export default Paginate;
