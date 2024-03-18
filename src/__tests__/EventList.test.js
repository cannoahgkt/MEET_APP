// src/__tests__/EventList.test.js

import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import mockData from '../mock-data';
import EventList from '../components/EventList';
import App from "../App";
import userEvent from '@testing-library/user-event';

describe('<EventList /> component', () => {
  test('has an element with "list" role', () => {
    const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

    test('renders correct number of events', () => {
    const EventListComponent = render(<EventList events={mockData} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(mockData.length);
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });
});