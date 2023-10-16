import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "../utils/Text";
import { Link, useNavigate } from "react-router-native";
import useAuthStorage from "../../hooks/useAuthStorage";
import { ME } from "../../graphql/queries";
import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: "#24292e",
    paddingLeft: 15,
    paddingBottom: 15,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    marginRight: 20,
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const { data, error, loading } = useQuery(ME);
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if (!data && loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to={"/"}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
            Repositories
          </Text>
        </Link>
        {data.me ? (
          <>
            <Link to={"/createreview"}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
                Create a Review
              </Text>
            </Link>
            <Link to={"/myreview"}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
                My Reviews
              </Text>
            </Link>
            <Pressable onPress={signOut}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
                Sign Out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to={"/signin"}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
                Sign In
              </Text>
            </Link>
            <Link to={"/signup"}>
              <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
                Sign Up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
