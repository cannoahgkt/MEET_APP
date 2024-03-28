import { useState, useEffect } from "react";
import { extractLocations, getEvents } from '../api';


const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    // for the value in input
    const [query, setQuery] = useState("");
    // will suggest in li only cities that will match the input field
    const [suggestions, setSuggestions] = useState([]);


    useEffect(() => {
        setSuggestions(allLocations);
    }, [`${allLocations}`]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
        let infoText;
        // display message when City not found
        if (filteredLocations.length === 0) {
            infoText = "We can not find the city you are looking for. Please try another city"
        } else {
            //   no text -> the alert will stay hidden
            infoText = ""
        }
        setInfoAlert(infoText);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
        setCurrentCity(value);
        // to clear any alert messages that have been previous set , when user clicks on see all cities
        setInfoAlert("")
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Choose your nearest city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ?
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        // return list if location we suggest based on input 
                        return <li className="city_item" onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li className="city_item" onClick={handleItemClicked} key='See all cities'>
                        See all cities
                    </li>
                </ul>
                : null}
        </div>
    )
}

export default CitySearch;