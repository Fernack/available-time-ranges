import { AppointmentTypeId } from "./enums";

type GetBookedAppointments = (
    providerId: string,
    start: Date,
    end: Date,
  ) => Promise<Appointment[]>;
  
type AppointmentType = {
    appointmentTypeId: AppointmentTypeId;
    name: string;
    durationMins: number;
};

type Appointment = {
    appointmentId: string; 
    appointmentTypeId: AppointmentTypeId;
    start: Date;
};

type CalendarEvent = {
    calenderEventId: string;
    start: Date;
    end: Date;
};
  
type GetCalendarEvents = (
    providerId: string,
    start: Date,
    end: Date,
) => Promise<CalendarEvent[]>;

type TimeRange = {
    start: Date;
    end: Date;
};

export { GetBookedAppointments, AppointmentType, Appointment, CalendarEvent, GetCalendarEvents, TimeRange } 