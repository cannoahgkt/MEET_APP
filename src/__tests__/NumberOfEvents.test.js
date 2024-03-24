import NumberOfEvents from "../components/NumberOfEvents";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
  test("Contains an element with role textbox", () => {
    render(<NumberOfEvents currentNOE={32} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  test("Default value of text input is 32", () => {
    render(<NumberOfEvents currentNOE={32} />);
    expect(screen.getByRole("textbox")).toHaveValue("32");
  });
  test("ClassName of text input is input-number-of-events", () => {
    render(<NumberOfEvents currentNOE={32} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("input-number-of-events");
  });
  test("Value of input changes when user types in it", async () => {
    const mockPropFunction = jest.fn();
    render(
      <NumberOfEvents
        setCurrentNOE={mockPropFunction}
        setErrorAlert={mockPropFunction}
      />
    );

    const user = userEvent.setup();
    const input = screen.getByRole("textbox");
    await user.type(input, "{backspace}{backspace}10");
    expect(input).toHaveValue("10");
  });
});
