import { Alert, Button, Pressable, StyleSheet, View } from "react-native";
import Text from "./utils/Text";
import theme from "../theme";
import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-native";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { ME } from "../graphql/queries";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  rating: {
    borderColor: theme.colors.primary,
    borderWidth: 3,
    borderRadius: 65 / 2,
    marginRight: 15,
  },
  ratingText: {
    width: 55,
    height: 55,
    color: theme.colors.primary,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center",
  },
  text: {
    marginTop: 10,
  },
  containerPress: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginLeft: -15,
    marginTop: 10,
  },
  press: {
    marginRight: 15,
    paddingVertical: 10,
    width: "50%",
    borderRadius: 5,
  },
  pressText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
});

const ReviewItem = ({ review }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [mutate] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      ME, // DocumentNode object parsed with gql
      "ME", // Query name
    ],
  });

  const viewRepo = () => {
    navigate(`/${review.repositoryId}`);
  };

  const deleteReview = () => {
    Alert.alert("Delete review", "Are you sure want to delete this review?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => mutate({ variables: { deleteReviewId: review.id } }),
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <View style={styles.rating}>
            <Text fontWeight={"bold"} style={styles.ratingText}>
              {review.rating}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text fontWeight={"bold"}>{review.user.username}</Text>
          <Text color={"textSecondary"}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {!params.id && (
        <View style={styles.containerPress}>
          <Pressable
            style={{ ...styles.press, backgroundColor: theme.colors.primary }}
            onPress={viewRepo}
          >
            <Text style={styles.pressText} fontWeight={"bold"}>
              View Repostitory
            </Text>
          </Pressable>
          <Pressable
            style={{ ...styles.press, backgroundColor: "#e3594f" }}
            onPress={deleteReview}
          >
            <Text style={styles.pressText} fontWeight={"bold"}>
              Deleve Review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default ReviewItem;
