import { useState } from "react";

const Event = ({event}) => {
  const [showDetails, setShowDetails] = useState(false);
    return (
      <li className="event">
        <h3>{event.summary}</h3>
        <p>{event.location}</p>
        <p>{(new Date(event.created)).toUTCString()}</p>
        {showDetails ?
          <p className="details">{event.description}</p> :
          null
        }
        <button className="details-btn" onClick={() => {
          showDetails ? setShowDetails(false) : setShowDetails(true)
        }}>{showDetails ? "hide details" : "show details"}</button>
      </li>
    )
}
  
export default Event;