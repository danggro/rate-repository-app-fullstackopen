import { Formik } from "formik";
import { Pressable, StyleSheet, View } from "react-native";
import FormikTextInput from "./utils/FormikTextInput";
import Text from "./utils/Text";
import * as yup from "yup";
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={{ padding: 15, backgroundColor: "#FFF" }}>
      <FormikTextInput name={"ownerName"} placeholder="Repository owner name" />
      <FormikTextInput name={"repositoryName"} placeholder="Repository name" />
      <FormikTextInput name={"rating"} placeholder="Rating between 0 and 100" />
      <FormikTextInput name={"text"} placeholder="Review" />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText} fontWeight={"bold"}>
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number("Rating must number")
    .min(0, "Number must more than 0")
    .max(100, "Number must less than 100")
    .required("Repository name is required"),
  text: yup.string().optional(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const review = {
      ownerName,
      repositoryName,
      rating: parseInt(rating),
      text,
    };
    await createReview({
      variables: {
        review,
      },
      onCompleted: (data) => {
        console.log(data);
      },
    });
  };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};
export default CreateReview;
