import { gql } from "@apollo/client";
import { DETAILS_REPO, DETAILS_REVIEW } from "./fragments";

export const CHECK = gql`
  query Query(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $orderDirection: OrderDirection
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      orderDirection: $orderDirection
    ) {
      edges {
        node {
          fullName
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasPreviousPage
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query Query(
    $searchKeyword: String
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $first: Int
    $after: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...DetailsRepo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
  ${DETAILS_REPO}
`;

export const ME = gql`
  query ME($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...DetailsReview
          }
        }
      }
    }
  }
  ${DETAILS_REVIEW}
`;

export const GET_ONEREPOSITORY = gql`
  query Query($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      ...DetailsRepo
      url
      reviews(after: $after, first: $first) {
        edges {
          node {
            ...DetailsReview
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
  ${DETAILS_REPO}
  ${DETAILS_REVIEW}
`;
