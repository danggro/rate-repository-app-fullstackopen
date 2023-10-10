import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      padding: 17,
      backgroundColor: "#fff",
    },
    flexCol: {
      flexDirection: "column",
    },
    flexRow: {
      flexDirection: "row",
    },
    topContainer: {
      flexDirection: "row",
    },
    avatar: {
      height: 50,
      width: 50,
    },
    description: {
      marginVertical: 10,
      flex: 1,
      flexWrap: "wrap",
    },
    language: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme.colors.primary,
      borderRadius: 5,
      alignSelf: "flex-start",
      width: "auto",
      color: "#FFf",
    },
    countsContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 20,
    },
    counts: {
      flexDirection: "column",
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={{ marginRight: 20, flexShrink: 0 }}>
          <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        </View>
        <View style={{ flexShrink: 1 }}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary" style={styles.description}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <View style={styles.counts}>
          <Text fontWeight={"bold"}>
            {item.stargazersCount > 1000
              ? (item.stargazersCount / 1000).toFixed(1) + "K"
              : item.stargazersCount}
          </Text>
          <Text color={"textSecondary"}>Stars</Text>
        </View>
        <View style={styles.counts}>
          <Text fontWeight={"bold"}>
            {item.forksCount > 1000
              ? (item.forksCount / 1000).toFixed(1) + "K"
              : item.fitem.forksCountorksCount}
          </Text>
          <Text color={"textSecondary"}>Forks</Text>
        </View>
        <View style={styles.counts}>
          <Text fontWeight={"bold"}>{item.reviewCount}</Text>
          <Text color={"textSecondary"}>Reviews</Text>
        </View>
        <View style={styles.counts}>
          <Text fontWeight={"bold"}>{item.ratingAverage}</Text>
          <Text color={"textSecondary"}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
