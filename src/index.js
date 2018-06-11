import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { gqlClient } from "./gql/gql-client";
import { SearchModule } from "./search";
import { Header } from "./layout";

import { parseSearchString, writeHistory } from "./utils";

import "./main.css";

class App extends React.Component {
  /*
    Didn't intend for it to work out this way, but all the 
    state ended up at the root. It's still way too simple 
    of an app to bother pulling in something like Redux. But,
    if we extended this out to include more modules and more
    shared state, then it might be a good fit.
  */
  state = {
    query: "",
    initialCursor: null
  };

  onSearchChanged = query => {
    writeHistory({ q: query });
    // Whenever we set a new query, we reset the
    // initial cursor to a null value. That prevents
    // any accidental jumping in the result set if
    // there is crossover between two result sets.
    this.setState({ query, initialCursor: null });
  };

  componentDidMount = () => {
    // This lets us deep-link into our result set.
    // That means we can browse to people's GH profiles,
    // and then come right back to where we left off.
    let { q, s } = parseSearchString();
    if (q) {
      this.setState({
        query: q,
        initialCursor: s || null
      });
    }
  };

  render() {
    /*
      We're doing some primitive routing here. Didn't
      feel worth it pulling in React Router or similar
      for what amounts to a single page. Near the end
      though it almost seemed like a good idea. Just 
      needed a couple more hours. 
    */
    return (
      <ApolloProvider client={gqlClient}>
        <React.Fragment>
          <Header
            query={this.state.query}
            onSearchChanged={this.onSearchChanged}
          />
          <SearchModule
            query={this.state.query}
            initialCursor={this.state.initialCursor}
            onSearchChanged={this.onSearchChanged}
          />
        </React.Fragment>
      </ApolloProvider>
    );
  }
}

render(<App />, document.getElementById("root"));
