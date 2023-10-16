import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 4,
    color: theme.colors.textSecondary,
  },
  error: {
    borderColor: "#d73a4a",
  },
  normal: {
    borderColor: theme.colors.textSecondary,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    styles.textInput,
    error ? styles.error : styles.normal,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
