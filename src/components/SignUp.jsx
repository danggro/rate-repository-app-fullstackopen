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
import { useApolloClient, useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

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

const SignUpForm = ({ onSubmit }) => {
  return (
    <>
      <View style={{ padding: 15, backgroundColor: "#FFF" }}>
        <FormikTextInput name={"username"} placeholder="Username" />
        <FormikTextInput
          name={"password"}
          placeholder="Password"
          secureTextEntry={true}
        />
        <FormikTextInput
          name={"passwordConfirm"}
          placeholder="Password Confirmation"
          secureTextEntry={true}
        />
        <Pressable onPress={onSubmit} style={styles.button}>
          <Text style={styles.buttonText} fontWeight={"bold"}>
            Sign Up
          </Text>
        </Pressable>
      </View>
    </>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must more than 5")
    .max(30, "Username must lss than 30")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must more than 5")
    .max(30, "Password must lss than 30")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirm is required"),
});

export const SignUpContainer = ({ onSubmit }) => {
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const [muttaaa] = useMutation(CREATE_USER);
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await muttaaa({ variables: { user: { username, password } } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <SignUpContainer onSubmit={onSubmit} />;
};
export default SignUp;
