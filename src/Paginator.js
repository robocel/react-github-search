import React from "react";
import ReactPaginate from "react-paginate";
import { PropTypes } from "prop-types";

/**
 * Props
 *  pageSize
 *  totalCount
 *
 */

export class Paginator extends React.Component {
  static propType = {
    totalItems: PropTypes.number.isRequired,
    onPageChange: PropTypes.func
  };

  handlePageChange = page => {
    if (this.props.onPageChange) {
      this.props.onPageChange((page.selected - 1) * 10);
    }
  };

  render() {
    return (
      <ReactPaginate
        pageCount={Math.min(Math.ceil(this.props.totalItems) / 10, 100)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={this.handlePageChange}
      />
    );
  }
}
