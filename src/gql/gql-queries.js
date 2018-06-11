import gql from "graphql-tag";

/**
 * Currently, we're re-using the same query for paginating forwards
 * and backwards. This is not ideal. TODO: Break this up into multiple
 * queries conditionally used when going forward/back! Share the
 * fragments between the two queries!
 */
export const SEARCH_USERS_QUERY = gql`
  query(
    $queryString: String!
    $forwardCursor: String
    $backwardsCursor: String
    $blimit: Int
    $flimit: Int
  ) {
    search(
      type: USER
      query: $queryString
      first: $flimit
      last: $blimit
      after: $forwardCursor
      before: $backwardsCursor
    ) {
      userCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        __typename
        ... on User {
          login
          name
          bio
          location
          followers {
            totalCount
          }
          repositories {
            totalCount
          }
          email
          avatarUrl
          url
        }
        ... on Organization {
          login
          name
          description
          location
          avatarUrl
          url
          members {
            totalCount
          }
          repositories {
            totalCount
          }
        }
      }
    }
  }
`;
