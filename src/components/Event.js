// src/components/Event.js

const Event = ({event}) => {
  console.log(event, "EVENT LOG")
  return (
  <li key={event.id}>{event?.summary}</li>
  );
  }
  
  export default Event;