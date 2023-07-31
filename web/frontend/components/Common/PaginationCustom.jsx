import { Pagination } from "@shopify/polaris";
import React, { useMemo } from "react";

export const DOTS = "...";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default function PaginationCustom({
  activePage,
  totalCount,
  pageDataCount,
  onPageChange,
}) {
  let siblingCount = 1;

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageDataCount);
    const totalPageNumbers = siblingCount + 5;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      activePage + siblingCount,
      totalPageCount
    );
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageDataCount, siblingCount, activePage]);

  const onNext = () => {
    onPageChange(activePage + 1);
  };

  const onPrevious = () => {
    onPageChange(activePage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <Pagination
      label={
        <ul className="pagination_main">
          {paginationRange.map((pageNumber, i) => {
            if (pageNumber === DOTS) {
              return <li className="pagination-item dots">&#8230;</li>;
            }
            return (
              <li
                onClick={() => onPageChange(pageNumber)}
                key={i}
                className={pageNumber === activePage ? "active" : ""}
              >
                {pageNumber}
              </li>
            );
          })}
        </ul>
      }
      hasPrevious={activePage === 1 ? false : true}
      onPrevious={onPrevious}
      hasNext={activePage === lastPage ? false : true}
      onNext={onNext}
    />
  );
}
