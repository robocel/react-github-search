import React from "react";
import { SearchForm, SearchQuery, UserPanel, OrganizationPanel } from "./";
import { writeHistory } from "../utils";

export const SearchModule = ({ onSearchChanged, query, initialCursor }) => {
  let onTransition = nextCursor => {
    // TODO: This is impure. Resolve this if there's time.
    writeHistory({ q: query, s: nextCursor });
  };

  return query.length < 1 ? (
    <SearchForm onSubmit={onSearchChanged} />
  ) : (
    <SearchQuery
      query={query}
      initialCursor={initialCursor}
      onTransition={onTransition}
    >
      {({ loading, error, data, canBack, goBack, canForward, goForward }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {`${error}`}</div>;
        return (
          <React.Fragment>
            <div className="mb-1 fs-1 fw-1">
              {data.totalCount} results for query: "{query}"
            </div>
            {data.results.map(
              result =>
                result.__typename === "User" ? (
                  <UserPanel key={result.login} user={result} />
                ) : (
                  <OrganizationPanel key={result.login} org={result} />
                )
            )}
            <div className="flex-space-evenly">
              {canBack ? (
                <button className="paginationBtn" onClick={goBack}>
                  Previous
                </button>
              ) : null}
              {canForward ? (
                <button className="paginationBtn" onClick={goForward}>
                  Next
                </button>
              ) : null}
            </div>
          </React.Fragment>
        );
      }}
    </SearchQuery>
  );
};
