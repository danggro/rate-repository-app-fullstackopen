import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import BodyMassIndexCalculator from "./bmi";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8ECDDD",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bmi" element={<BodyMassIndexCalculator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
