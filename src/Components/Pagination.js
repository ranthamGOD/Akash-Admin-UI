import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAnglesLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  handleDeleteSelected,
  setCurrentPage,
  selectedRow,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageCount = () => {
    const pageCounts = [];
    for (let i = 1; i <= totalPages; i++) {
      pageCounts.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageCounts;
  };

  return (
    <div className="pag">
      <div className="pagination-buttons">
        <div className="delete-selected">
          <button
            disabled={selectedRow.length === 0}
            style={{
              backgroundColor:
                selectedRow.length === 0 ? "lightgrey" : "tomato",
              color: "white",
              borderRadius: "20px",
            }}
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        </div>
        <div className="pg">
          <button
            onClick={() => {
              if (currentPage !== 1) {
                handlePageChange(1);
              }
            }}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {getPageCount()}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            onClick={() => {
              if (currentPage !== totalPages) {
                handlePageChange(totalPages);
              }
            }}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;