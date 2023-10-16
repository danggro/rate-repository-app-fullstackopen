import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../../components/SignIn";
// ...

describe.only("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "123456");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "anang");
      fireEvent.press(screen.getByText("Sign in"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        // expect the onSubmit function to have been called once and with a correct first argument
      });
    });
  });
});
