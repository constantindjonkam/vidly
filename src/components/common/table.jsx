import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ movies, columns, onSort, order, path, sortColumn }) => {
  return (
    <table className="table">
      <TableHeader
        sortColumn={sortColumn}
        columns={columns}
        onSort={onSort}
        order={order}
      />
      <TableBody items={movies} columns={columns} />
    </table>
  );
};

export default Table;
