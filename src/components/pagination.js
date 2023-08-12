import React from "react";
import { Link } from "gatsby";

const Pagination = ({ currentPage, onPageChange, hasNextPage, total, postsPerPage }) => {
  const getPageLink = (pageNo) => {
    return `/page/${pageNo}`;
  };

  const getPageNumbers = (currentPage, totalPages) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pageNumbers.push({
          pageNo: i,
          isActive: i === currentPage,
        });
      } else if (i === currentPage - 3 || i === currentPage + 3) {
        pageNumbers.push({
          pageNo: '...',
          isActive: false,
        });
      }
    }
  
    return pageNumbers;
  };

  const totalPages = Math.ceil(total / postsPerPage);
  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const isThereNextPage = currentPage < totalPages;

  return (
    <div className='pagination-links'>
      {currentPage > 1 &&
        <Link
          to={getPageLink(currentPage - 1)}
          className='prev page-numbers'
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage - 1);
            window.location.href = `${window.location.origin}#index`
          }}
        >
          « Prev
        </Link>
      }

      {pageNumbers.map((item, index) => {
        if (item.isActive) {
          return (
            <span
              key={index}
              className='page-numbers current'
            >
              {item.pageNo}
            </span>
          );
        } else {
          return (
            <React.Fragment key={index}>
              {item.pageNo === '...' ? (
                <span className='page-numbers dots'>{item.pageNo}</span>
              ) : (
                <Link
                  to={getPageLink(item.pageNo)}
                  className='page-numbers'
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(item.pageNo);
                    window.location.href = `${window.location.origin}#index`
                  }}
                >
                  {item.pageNo}
                </Link>
              )}
            </React.Fragment>
          );
        }
      })}

      {isThereNextPage &&
        <Link
          to={getPageLink(currentPage + 1)}
          className='next page-numbers'
          onClick={(e) => {
            e.preventDefault();
            onPageChange(currentPage + 1);
            window.location.href = `${window.location.origin}#index`
          }}
        >
          Next »
        </Link>
      }
    </div>
  );
};

export default Pagination;