import { render, within, waitFor, screen } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    render(<EventList />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    render(<EventList events={allEvents} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(allEvents.length);
  });
});

describe("<EventList /> integration", () => {
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    render(<App />);
    const EventListDOM = screen.getByTestId("event-list");
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });
});
