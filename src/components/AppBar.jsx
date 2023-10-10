import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import { Link } from "react-router-native";

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to={"/"}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
            Repositories
          </Text>
        </Link>
        <Link to={"/signin"}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
            Sign In
          </Text>
        </Link>
        <Link to={"/bmi"}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.text}>
            BMI
          </Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
