import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("Event element is initially collapsed", ({ given, when, then }) => {
    let EventListDOM;
    given("the user launches the application", () => {
      render(<App />);
    });

    when("the upcoming events list is displayed", async () => {
      EventListDOM = screen.getByTestId("event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    then(
      "each event element should be collapsed, displaying only basic event information",
      () => {
        const eventElements = within(EventListDOM).queryAllByRole("listitem");
        eventElements.forEach((eventElement) => {
          const details = within(eventElement).queryByTestId("event-description");
          expect(details).not.toBeInTheDocument();
        });
      }
    );
  });

  test("User can expand event details", ({ given, when, then }) => {
    let EventListDOM;
    let expandedEventElement;
    given(
      "the user opens the application and the list of upcoming events is displayed",
      async () => {
        render(<App />);
        EventListDOM = screen.getByTestId("event-list");

        await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );

    when("the user clicks on the show details button", async () => {
      const eventElement = within(EventListDOM).queryAllByRole("listitem")[0];
      const showDetailsButton = within(eventElement).queryByTestId("details-btn");
      userEvent.click(showDetailsButton);
      expandedEventElement = eventElement;
    });

    then(
      "the event element should expand, revealing extra event details",
      () => {
        const details = within(expandedEventElement).queryByTestId("event-description");
        expect(details).toBeDefined();
      }
    );
  });

  test("User can hide event details", ({ given, when, then }) => {
    let expandedEventElement;
    let EventListDOM;
    given(
      "the user opens the application and clicks the show details button of the first event",
      async () => {
        render(<App />);
        EventListDOM = screen.getByTestId("event-list");

        await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });

        const firstEvent = within(EventListDOM).queryAllByRole("listitem")[0];
        const detailsButton = within(firstEvent).queryByTestId("details-btn");
        userEvent.click(detailsButton);
        expandedEventElement = firstEvent;
      }
    );
    when(
      "the user clicks the details button again while details are being shown",
      () => {
        const detailsButton = within(expandedEventElement).queryByTestId("details-btn");
        userEvent.click(detailsButton);
      }
    );

    then(
      "the event element should collapse, concealing the supplementary event details",
      () => {
        const details = within(expandedEventElement).queryByTestId("event-description");
        expect(details).not.toBeInTheDocument();
      }
    );
  });
});
