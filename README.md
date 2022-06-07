## Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Get Availabile Time Ranges:
   
Implement `getAvailableTimeRanges`. This function returns the available appointment time ranges for a provider for a given a date range. The time ranges must be greater than or equal to the duration of the appointment type the provider is trying to book. Also, please add additional test cases as needed.

Considerations:
    - Provider calendars are stored in google calendar. Use `getCalenderEvents` to fetch this data.
    - Provider appointments are stored in an external EMR service. Use `getBookedAppointments` to fetch this data.

Example:

```
Assume `getAvailableTimeRanges` is called with a provider for whom we are trying to book a FOLLOWUP_30 appointment from July 1, 
2020 @ 1pm to July 1, 2020 @ 5pm. And assume that the provider has a single non-appointment calendar event on July 1, 
2020 @ 1:45pm until July 1, 2020 @ 2:15pm. Also assume that the provider has a single booked NEW_PATIENT_60 appointment 
from July 1, 2020 @ 3pm - 4pm. Given the above, `getAvailableTimeRanges` should return the following available time ranges:
        
        - range 1: start: July 1, 2020 @ 1pm, end: July 1, 2020 @ 1:45pm
        - range 2: start: July 1, 2020 @ 2:15pm, end: July 1, 2020 @ 3:00pm
        - range 3: start: July 1, 2020 @ 4pm, end: July 1, 2020 @ 5pm
  ```

For an example test see main.test.ts.

NOTE: You are allowed to look things up on the internet and install any npm modules that you need.