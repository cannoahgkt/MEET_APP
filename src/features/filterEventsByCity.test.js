import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  let AppComponent;
  let CitySearchDOM;
  let CitySearchInput;
  let BerlinGermanySuggestion;
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    then("the user should see the list of upcoming events.", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {
      AppComponent = render(<App />);
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');  
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they've typed",
      async () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(2);
      }
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    given("user was typing “Berlin” in the city textbox", async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      CitySearchDOM = screen.getByTestId("city-search");
      CitySearchInput = within(CitySearchDOM).getByRole("textbox");
      await user.type(CitySearchInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when(
      "the user selects a city (e.g., “Berlin, Germany”) from the list",
      async () => {
        const user = userEvent.setup();
        BerlinGermanySuggestion = screen.queryAllByRole("listitem")[0];
        await user.click(BerlinGermanySuggestion);
      }
    );

    then(
      "their city should be changed to that city (i.e., “Berlin, Germany”)",
      () => {
        expect(CitySearchInput.value).toBe(BerlinGermanySuggestion.textContent);
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const EventListDOM = screen.getByTestId("event-list");
        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(17);
        });
      }
    );
  });
});
