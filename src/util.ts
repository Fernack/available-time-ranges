import * as moment from 'moment';
import { AppointmentTypeId } from "./enums";
import { Appointment, AppointmentType, CalendarEvent } from "./types";

export default class Utils {
    
    static appointmentTypesDurationMinsHash = {};
    
    static cacheAppointmentTypesDurationMinsHash(appointmentTypes: AppointmentType[]) { 
        for (let index = 0; index < appointmentTypes.length; index++) {
            this.appointmentTypesDurationMinsHash[appointmentTypes[index].appointmentTypeId] = appointmentTypes[index].durationMins;
        }
    }    

    static getDurationMinsByAppointmentTypeId(appointmentTypeId: AppointmentTypeId) : number {
        return this.appointmentTypesDurationMinsHash[appointmentTypeId];
    }

    static getBookedAppointmentsAsCalendarEvents(bookedAppointments: Appointment[]) : CalendarEvent[] {
        let calendarEvents : CalendarEvent[] = [];

        bookedAppointments.map(bookedAppointment => {
            let durationMins = this.getDurationMinsByAppointmentTypeId(bookedAppointment.appointmentTypeId);

            let end = moment(bookedAppointment.start).add(durationMins, 'm');

            calendarEvents.push({ 
                calenderEventId: bookedAppointment.appointmentId, 
                start: bookedAppointment.start, 
                end: end.toDate() 
            });
        });
        
        return calendarEvents;

    }
}