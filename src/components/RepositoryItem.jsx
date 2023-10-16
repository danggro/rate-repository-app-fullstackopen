import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "./utils/Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
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
  linkGithub: {
    color: "#fff",
    backgroundColor: theme.colors.primary,
    width: "100%",
    paddingVertical: 12,
    borderRadius: 2,
    marginTop: 15,
  },
});

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  const onPress = () => {
    if (item.url) {
      return null;
    }
    navigate(`/${item.id}`);
  };

  const openLink = () => {
    Linking.openURL(item.url);
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container} testID="repositoryItem">
        <View style={styles.flexRow}>
          <View style={{ marginRight: 20, flexShrink: 0 }}>
            <Image
              style={styles.avatar}
              source={{ uri: item.ownerAvatarUrl }}
            />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text fontWeight="bold" testID="fullname">
              {item.fullName}
            </Text>
            <Text color="textSecondary" style={styles.description}>
              {item.description}
            </Text>
            <Text style={styles.language} testID="language">
              {item.language}
            </Text>
          </View>
        </View>
        <View style={styles.countsContainer}>
          <View style={styles.counts}>
            <Text fontWeight={"bold"} testID="stargazersCount">
              {item.stargazersCount > 1000
                ? (item.stargazersCount / 1000).toFixed(1) + "K"
                : item.stargazersCount}
            </Text>
            <Text color={"textSecondary"}>Stars</Text>
          </View>
          <View style={styles.counts}>
            <Text fontWeight={"bold"} testID="forksCount">
              {item.forksCount > 1000
                ? (item.forksCount / 1000).toFixed(1) + "K"
                : item.forksCount}
            </Text>
            <Text color={"textSecondary"}>Forks</Text>
          </View>
          <View style={styles.counts}>
            <Text fontWeight={"bold"} testID="reviewCount">
              {item.reviewCount}
            </Text>
            <Text color={"textSecondary"}>Reviews</Text>
          </View>
          <View style={styles.counts}>
            <Text fontWeight={"bold"} testID="ratingAverage">
              {item.ratingAverage}
            </Text>
            <Text color={"textSecondary"}>Rating</Text>
          </View>
        </View>
        {item.url && (
          <Pressable onPress={openLink} style={styles.linkGithub}>
            <Text style={{ color: "#fff", fontSize: 14, alignSelf: "center" }}>
              Open in GitHub
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
