import React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";
import { gqlClient } from "./gql-client";
import { MATCHING_USERS } from "./gql-queries";
import { UserPanel } from "./UserPanel";
import { OrganizationPanel } from "./OrganizationPanel";
import { Paginator } from "./Paginator";

console.log(gqlClient);

class App extends React.Component {
  state = {
    query: ""
  };

  onSearch = event => {
    this.setState({
      query: event.target.value
    });
  };

  fetchMore = offset => {};

  render() {
    return (
      <ApolloProvider client={gqlClient}>
        <div>
          <input
            type="text"
            value={this.state.query}
            onChange={this.onSearch}
          />
        </div>
        <Query
          query={MATCHING_USERS}
          variables={{
            queryString: this.state.query,
            flimit: 10
          }}
        >
          {({ loading, error, data, fetchMore }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error: {error}</div>;
            return (
              <React.Fragment>
                <div>{data.search.userCount} Results</div>
                {data.search.pageInfo.hasPreviousPage ? (
                  <button
                    onClick={() =>
                      fetchMore({
                        variables: {
                          forwardCursor: null,
                          backwardsCursor: data.search.pageInfo.startCursor
                        },
                        updateQuery: (prev, { fetchMoreResult }) =>
                          fetchMoreResult || prev
                      })
                    }
                  >
                    Previous
                  </button>
                ) : null}
                {data.search.pageInfo.hasNextPage ? (
                  <button
                    onClick={() =>
                      fetchMore({
                        variables: {
                          forwardCursor: data.search.pageInfo.endCursor,
                          backwardsCursor: null
                        },
                        updateQuery: (prev, { fetchMoreResult }) =>
                          fetchMoreResult || prev
                      })
                    }
                  >
                    Next{" "}
                  </button>
                ) : null}
                <Paginator
                  totalItems={data.search.userCount}
                  onPageChange={offset => {
                    fetchMore({
                      variables: { offset },
                      updateQuery: (prev, { fetchMoreResult }) =>
                        fetchMoreResult || prev
                    });
                  }}
                />
                {data.search.nodes.map(
                  user =>
                    user.__typename === "User" ? (
                      <UserPanel key={user.login} user={user} />
                    ) : (
                      <OrganizationPanel key={user.login} org={user} />
                    )
                )}
              </React.Fragment>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
