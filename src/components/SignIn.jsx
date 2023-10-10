import { Formik } from "formik";
import Text from "./Text";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import * as yup from "yup";

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

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </>
  );
};
export default SignIn;
