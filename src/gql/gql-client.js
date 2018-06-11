import { GITHUB_TOKEN } from "../utils";
import ApolloClient from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { GITHUB_SCHEMAS } from "./github-schemas";

// This matcher allows Apollo to handle GitHub's union type results.
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
