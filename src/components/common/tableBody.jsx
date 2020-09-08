import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  render() {
    const { items, columns } = this.props;

    const generateKey = (movie, column) => {
      return movie._id + (column.path || column.key);
    };

    const renderCell = (item, column) => {
      if (column.content) return column.content(item);

      return _.get(item, column.path);
    };

    return (
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={generateKey(item, column)}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
