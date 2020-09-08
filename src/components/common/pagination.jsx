import React from "react";
import _ from "lodash";

const Pagination = ({ onPageChange, pageSize, totalItem, currentPage }) => {
  const endPage = Math.ceil(totalItem / pageSize);
  const pages = _.range(1, endPage + 1);

  if (endPage === 1) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button onClick={() => onPageChange(page)} className="page-link">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
