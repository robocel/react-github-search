import React from "react";

import { IconSearch } from "../icons";

export const SearchForm = ({ onSubmit }) => (
  <div
    style={{
      paddingTop: "100px",
      paddingBottom: "100px"
    }}
  >
    <div
      className="fs-3"
      style={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <IconSearch /> Search all GitHub users and organizations
      <form
        className="mt-1 flex"
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.target.query.value);
        }}
      >
        <input
          className="flex-grow fs-2 no-outline br-1 mr-1 search-input"
          name="query"
          type="text"
        />
        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>
    </div>
  </div>
);
