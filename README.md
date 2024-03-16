Project Features & Scenarios

Feature: Filter Events By City

Scenario: When user hasn’t searched for a city, show upcoming events from all cities. Given the events app is open When I view the list of upcoming events Then I should see events from all cities

Scenario: User should see a list of suggestions when they search for a city. Given the events app is open When I start typing in the city search bar Then I should see a list of suggested cities

Scenario: User can select a city from the suggested list. Given the events app is open When I select a city from the suggested list Then the events list should be filtered for the selected city

Feature: Show/Hide Event Details

Scenario: An event element is collapsed by default. Given the events app is open When I view the list of events Then each event element should be collapsed

Scenario: User can expand an event to see details. Given the events app is open When I click on an event element Then the details of that event should be visible

Scenario: User can collapse an event to hide details. Given the events app is open And an event details are visible When I click on the collapse button Then the details of that event should be hidden

Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 events are shown by default. Given the events app is open When I view the list of events Then I should see 32 events displayed

Scenario: User can change the number of events displayed. Given the events app is open When I specify the number of events as 50 Then I should see 50 events displayed

Feature: Use the App When Offline

Scenario: Show cached data when there’s no internet connection. Given the events app is open And there is no internet connection When I view the list of events Then I should see cached event data

Scenario: Show error when user changes search settings (city, number of events). Given the events app is open And there is no internet connection When I try to change search settings Then I should see an error message

Feature: Add an App Shortcut to the Home Screen

Scenario: User can install the meet app as a shortcut on their device home screen. Given the events app is open When I choose to add the app to the home screen Then a shortcut to the meet app should be added to the device home screen

Feature: Display Charts Visualizing Event Details

Scenario: Show a chart with the number of upcoming events in each city. Given the events app is open When I navigate to the charts section Then I should see a chart displaying the number of upcoming events in each city

Using serverless functions:

These serverless functions will be responsible for securely managing user access, obtaining and refreshing OAuth2 tokens, and ensuring the security of interactions between your React application and the Google Calendar API. The serverless architecture offers benefits such as easy scalability, efficient resource utilization, and cost-effectiveness, as you only pay for the actual execution of functions rather than maintaining a dedicated server infrastructure