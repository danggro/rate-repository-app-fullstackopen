import { gql } from "@apollo/client";

export const DETAILS_REPO = gql`
  fragment DetailsRepo on Repository {
    id
    fullName
    name
    ownerAvatarUrl
    forksCount
    description
    language
    stargazersCount
    reviewCount
    ratingAverage
  }
`;

export const DETAILS_REVIEW = gql`
  fragment DetailsReview on Review {
    id
    text
    rating
    createdAt
    repositoryId
    user {
      id
      username
    }
  }
`;
