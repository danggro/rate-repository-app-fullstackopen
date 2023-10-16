import RepositoryItem from "../RepositoryItem";
import { useParams } from "react-router-native";
import { FlatList } from "react-native";
import ReviewItem from "../ReviewItem";
import useOneRepositories from "../../hooks/useOneRepository";

const SingleRepository = () => {
  const params = useParams();
  const { data, loading, fetchMore } = useOneRepositories({
    repositoryId: params.id,
    first: 4,
  });

  const dataReview = data ? data.reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return null;
  }

  return (
    <FlatList
      data={dataReview}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};
export default SingleRepository;
