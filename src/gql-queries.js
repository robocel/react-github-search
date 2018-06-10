import { gql } from "apollo-boost";

export const MATCHING_USERS = gql`
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
