import React, { Component } from "react";

class TableHeader extends Component {
  renderSort = (column) => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order !== "asc")
      return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  raiseSort = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (column.path === sortColumn.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = column.path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              className="clickable"
              scope="col"
              onClick={() => this.raiseSort(column)}
            >
              {column.label}
              {this.renderSort(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
