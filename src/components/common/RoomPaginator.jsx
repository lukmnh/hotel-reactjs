import React from "react";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
  // generates an array of page number based on totalPages props starting from 1
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {/* Map over pageNumbers to create pagination items */}
        {pageNumbers.map((pageNumbers) => (
          <li
            key={pageNumbers}
            className={`pageItem ${
              currentPage === pageNumbers ? "active" : ""
            }`}
          >
            {" "}
            {/* Apply 'active' class if this page is the current page */}
            <button
              className="btn-page"
              onClick={() => onPageChange(pageNumbers)}
            >
              {pageNumbers} {/* display the page numbers */}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default RoomPaginator;
