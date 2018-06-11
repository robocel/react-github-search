import React from "react";
import { Query } from "react-apollo";

import { RESULTS_PER_PAGE } from "../utils";
import { SEARCH_USERS_QUERY } from "../gql";

export const SearchQuery = ({
  query,
  initialCursor,
  onTransition,
  children
}) => (
  <Query
    query={SEARCH_USERS_QUERY}
    variables={{
      queryString: query,
      forwardCursor: initialCursor,
      backwardsCursor: null,
      flimit: RESULTS_PER_PAGE,
      blimit: null
    }}
  >
    {({ loading, error, data, fetchMore }) => {
      let updateQuery = (prev, { fetchMoreResult }) => {
        // TODO: There's a bug when paginating backwards. We're
        // signalling the wrong cursor (it's not trivial to get
        // the right cursor without unnecessarily fetching extra
        // results or changing how we encode the URL to allow
        // forwards and backwards searching). What we see on screen
        // is correct, but the deep link is incorrect. Fix if time.
        onTransition(prev.search.pageInfo.endCursor);
        return fetchMoreResult || prev;
      };

      let loadingOrError = loading || error;

      return children({
        loading,
        error,
        data: loadingOrError
          ? { totalCount: 0, results: [] }
          : { totalCount: data.search.userCount, results: data.search.nodes },
        canForward: loadingOrError ? false : data.search.pageInfo.hasNextPage,
        canBack: loadingOrError ? false : data.search.pageInfo.hasPreviousPage,
        goForward: () =>
          fetchMore({
            variables: {
              flimit: RESULTS_PER_PAGE,
              forwardCursor: data.search.pageInfo.endCursor,
              blimit: null,
              backwardsCursor: null
            },
            updateQuery
          }),
        goBack: () =>
          fetchMore({
            variables: {
              flimit: null,
              forwardCursor: null,
              blimit: RESULTS_PER_PAGE,
              backwardsCursor: data.search.pageInfo.startCursor
            },
            updateQuery
          })
      });
    }}
  </Query>
);
