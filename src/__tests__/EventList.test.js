// src/__tests__/EventList.test.js

import { render } from '@testing-library/react';
import mockData from '../mock-data';
import EventList from '../components/EventList';
import { getEvents } from '../api';
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