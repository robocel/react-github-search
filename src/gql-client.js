import { GITHUB_TOKEN } from "./token";
import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { GITHUB_SCHEMAS } from "./github-schemas";

const fragmentMatcher = new IntrospectionFragmentMatcher(GITHUB_SCHEMAS);

const cache = new InMemoryCache({
  fragmentMatcher
});

export const gqlClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : ""
    }
  })
});

/*export const gqlClient = new ApolloClient({
  uri: "https://api.github.com/graphql",

  request: operation => {
    return operation.setContext({
      headers: {
        authorization: GITHUB_TOKEN ? `Bearer ${GITHUB_TOKEN}` : ""
      }
    });
  }
});*/
