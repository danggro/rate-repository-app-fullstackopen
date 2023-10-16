import { gql } from "@apollo/client";

export const SIGNIN = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        username
      }
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation Mutation($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
      rating
      text
      user {
        username
        id
      }
      repository {
        ownerName
        name
      }
    }
  }
`;
export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      username
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
