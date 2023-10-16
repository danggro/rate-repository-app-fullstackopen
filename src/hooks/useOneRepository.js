import { GET_ONEREPOSITORY } from "../graphql/queries";
import { useQuery } from "@apollo/client";

const useOneRepositories = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_ONEREPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    data: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useOneRepositories;
