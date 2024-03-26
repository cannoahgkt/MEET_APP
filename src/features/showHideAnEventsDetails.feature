Feature: Show  /Hide Event Details

Scenario: Initial Collapse of Event Details

Given the user logs into the application
When the user navigates to the events section
Then all event details should be collapsed by default

Scenario: Expand Event Details

Given the user is viewing a list of events
When the user clicks on an event to view its details
Then the details of the selected event should be expanded and displayed

Scenario: Collapse Event Details

Given the user is viewing expanded event details
When the user chooses to hide the details
Then the details of that event should be collapsed and hidden