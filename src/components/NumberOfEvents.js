import React from "react";

const NumberOfEvents =({setCurrentNOE, setErrorAlert})=>{
    const handleInputChanged =(event)=>{
        const value = event.target.value;
        console.log("Number is:", value);
    setCurrentNOE(value);
        let errorText;
        if (isNaN(value) || value <= 0) {
          errorText = "Minimum 1 is required";
          setErrorAlert(errorText);
        } else {
          setCurrentNOE(value);
          errorText = "";
          setErrorAlert(errorText);
        }
    }
    return (
        <div id="number-of-events">
          <input
            data-testid="numberOfEventsInput"
            type="text"
            className="textboxNumber"
            defaultValue="32"
            onChange={handleInputChanged}
          />
        </div>
      );
    };

export default NumberOfEvents;