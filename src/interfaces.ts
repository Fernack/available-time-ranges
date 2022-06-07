import { GetBookedAppointments, GetCalendarEvents } from "./types";


export interface AppointmentAvailabilityDeps {
    getCalendarEvents: GetCalendarEvents;
    getBookedAppointments: GetBookedAppointments;
}
  