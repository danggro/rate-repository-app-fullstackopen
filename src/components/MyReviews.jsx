import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import ReviewItem from "./ReviewItem";
import { FlatList } from "react-native";

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    variables: { includeReviews: true },
  });

  const dataReview = data ? data.me.reviews.edges.map((edge) => edge.node) : [];

  if (loading) {
    return null;
  }
  return (
    <FlatList
      data={dataReview}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
    />
  );
};
export default MyReviews;
