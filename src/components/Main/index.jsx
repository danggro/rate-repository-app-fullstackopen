import { StyleSheet, View } from "react-native";
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import RepositoryList from "../RepositoryList";
import SignIn from "../SignIn";
import SingleRepository from "../SingleRepository";
import CreateReview from "../CreateReview";
import SignUp from "../SignUp";
import MyReviews from "../MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8ECDDD",
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/myreview" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
