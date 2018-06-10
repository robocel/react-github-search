import React from "react";
import { render } from "react-dom";
import { ApolloProvider, Query } from "react-apollo";
import { gqlClient } from "./gql-client";
import { MATCHING_USERS } from "./gql-queries";
import { UserPanel } from "./UserPanel";
import { OrganizationPanel } from "./OrganizationPanel";
import queryString from "query-string";
import { IconGithub } from "./IconGithub";

import "./main.css";

class App extends React.Component {
  state = {
    query: "",
    startCursor: null
  };

  onSearch = event => {
    let query = event.target.value;
    window.history.pushState({}, "", `?q=${query}`);
    this.setState({
      query: query,
      startCursor: null
    });
  };

  componentDidMount = () => {
    let { q, s } = queryString.parse(window.location.search);
    if (q) {
      this.setState({
        query: q,
        startCursor: s || null
      });
    }
  };

  render() {
    return (
      <ApolloProvider client={gqlClient}>
        <React.Fragment>
          <div
            style={{
              backgroundColor: "black",
              paddingTop: "12px",
              paddingBottom: "12px",
              color: "rgba(255,255,255,0.75)"
            }}
          >
            <IconGithub />
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
              forwardCursor: this.state.startCursor,
              backwardsCursor: null,
              flimit: 10,
              blimit: null
            }}
          >
            {({ loading, error, data, fetchMore }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error: {error}</div>;
              return (
                <React.Fragment>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginBottom: "16px"
                    }}
                  >
                    {data.search.userCount} Results
                  </div>
                  {data.search.nodes.map(
                    user =>
                      user.__typename === "User" ? (
                        <UserPanel key={user.login} user={user} />
                      ) : (
                        <OrganizationPanel key={user.login} org={user} />
                      )
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly"
                    }}
                  >
                    {data.search.pageInfo.hasPreviousPage ? (
                      <button
                        style={{
                          position: "relative",
                          float: "left",
                          padding: "7px 12px",
                          marginLeft: "-1px",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          color: "#0366d6",
                          whitespace: "nowrap",
                          verticalAlign: "middle",
                          cursor: "pointer",
                          background: "#fff",
                          border: "1px solid #e1e4e8"
                        }}
                        onClick={() =>
                          fetchMore({
                            variables: {
                              flimit: null,
                              forwardCursor: null,
                              blimit: 10,
                              backwardsCursor: data.search.pageInfo.startCursor
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (fetchMoreResult) {
                                window.history.pushState(
                                  {},
                                  "",
                                  `?q=${this.state.query}&s=${
                                    prev.search.pageInfo.endCursor
                                  }`
                                );
                              }
                              return fetchMoreResult || prev;
                            }
                          })
                        }
                      >
                        Previous
                      </button>
                    ) : null}
                    {data.search.pageInfo.hasNextPage ? (
                      <button
                        style={{
                          position: "relative",
                          float: "left",
                          padding: "7px 12px",
                          marginLeft: "-1px",
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: "600",
                          color: "#0366d6",
                          whitespace: "nowrap",
                          verticalAlign: "middle",
                          cursor: "pointer",
                          background: "#fff",
                          border: "1px solid #e1e4e8"
                        }}
                        onClick={() =>
                          fetchMore({
                            variables: {
                              flimit: 10,
                              forwardCursor: data.search.pageInfo.endCursor,
                              blimit: null,
                              backwardsCursor: null
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (fetchMoreResult) {
                                window.history.pushState(
                                  {},
                                  "",
                                  `?q=${this.state.query}&s=${
                                    prev.search.pageInfo.endCursor
                                  }`
                                );
                              }
                              return fetchMoreResult || prev;
                            }
                          })
                        }
                      >
                        Next{" "}
                      </button>
                    ) : null}
                  </div>
                </React.Fragment>
              );
            }}
          </Query>
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
