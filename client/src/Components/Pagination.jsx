import React from "react";

export default function Pagination({ page, setPage, employees }) {
  const handleNextPage = () => {
    if (page < employees.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFirst = () => {
    setPage(1);
  };

  const handleLast = () => {
    setPage(employees.length);
  };

  return (
    <div>
      <button onClick={handleFirst} disabled={page === 1}>
        ◀◀
      </button>
      <button onClick={handlePrevPage} disabled={page === 1}>
        ◀
      </button>
      <button onClick={handleNextPage}>{page}</button>
      <button onClick={handleNextPage}>▶</button>
      <button onClick={handleLast}>▶▶</button>
    </div>
  );
}
