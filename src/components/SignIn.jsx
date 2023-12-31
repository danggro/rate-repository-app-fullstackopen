import { Formik } from "formik";
import Text from "./utils/Text";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./utils/FormikTextInput";
import theme from "../theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    width: "100%",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <>
      <View style={{ padding: 15, backgroundColor: "#FFF" }}>
        <FormikTextInput name={"username"} placeholder="Username" />
        <FormikTextInput
          name={"password"}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText} fontWeight={"bold"}>
            Sign in
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignIn = () => {
  const [signIn, result] = useSignIn();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  useEffect(() => {
    authStorage
      .getAccessToken()
      .then((token) => token.length > 0 && navigate("/"));
  }, []);

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      navigate("/");
      apolloClient.resetStore();
    } catch (error) {
      console.log("ini error bro", error);
    }
  };
  return <SignInContainer onSubmit={onSubmit} />;
};
export default SignIn;
