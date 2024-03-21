// src/components/EventList.js

import React from "react";
import Event from "./Event";

const EventList = ({ events }) => {
  let numberOfEvents = events.slice(0, 5);

  return (
    <ul id="event-list">
      {numberOfEvents.map(event => <Event key={event.id} event={event} />)}
    </ul>
  );
}

export default EventList;
