import { render, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

describe("<App /> component", () => {
  test("render CitySearch", () => {
    render(<App />);
    const citySearchElement = screen.getByTestId("city-search");
    expect(citySearchElement).toBeInTheDocument();
  });

  test("renders list of events", () => {
    render(<App />);
    const eventListElement = screen.getByTestId("event-list");
    expect(eventListElement).toBeInTheDocument();
  });
  test("renders number of events input", () => {
    render(<App />);
    const inputElement = screen.getByTestId("number-of-events");
    expect(inputElement).toBeInTheDocument();
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    render(<App />);

    const CitySearchDOM = screen.getByTestId("city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = screen.getByTestId("event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
  test("Renders the number of events specified by the user", async () => {
    const user = userEvent.setup();
    render(<App />);
    const NumberOfEventsDOM = screen.getByTestId("number-of-events");
    const NumberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole("textbox");
    await user.type(NumberOfEventsInput, "{backspace}{backspace}5");
    const EventListDOM = screen.getByTestId("event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");
    expect(allRenderedEventItems.length).toBe(5);
  });
});
