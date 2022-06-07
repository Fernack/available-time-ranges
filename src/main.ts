import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { appointmentTypes } from './constants';
import { AppointmentTypeId } from './enums';
import { AppointmentAvailabilityDeps } from './interfaces';
import { Appointment, CalendarEvent, GetBookedAppointments, GetCalendarEvents, TimeRange } from './types';
import Utils from './util';

export class AppointmentAvailability {
  private getCalendarEvents: GetCalendarEvents;
  private getBookedAppointments: GetBookedAppointments;

  constructor(deps: AppointmentAvailabilityDeps) {
    this.getCalendarEvents = deps.getCalendarEvents;
    this.getBookedAppointments = deps.getBookedAppointments;
  }

  async getAvailableTimeRanges(
    providerId: string,
    appointmentTypeId: AppointmentTypeId,
    start: Date,
    end: Date,
  ): Promise<TimeRange[]> {

    const moment = extendMoment(Moment);

    // better to have appointmentTypes in a hash for constant access
    Utils.cacheAppointmentTypesDurationMinsHash(appointmentTypes);

    let calendarEvents: CalendarEvent[] = await this.getCalendarEvents(providerId, start, end);
    const bookedAppointments: Appointment[] = await this.getBookedAppointments(providerId, start, end);
    
    // prefer to handle events of the same type. (calendarEvents)
    calendarEvents = calendarEvents.concat(Utils.getBookedAppointmentsAsCalendarEvents(bookedAppointments));
    
    let appointmentDateRange = [moment.range(start, end)];

    calendarEvents.map(ce => {
      let range = moment.range(ce.start, ce.end);

      appointmentDateRange = appointmentDateRange.reduce((ac, edr) => ac.concat(edr.subtract(range)), []);      
    })

    const appointmentMinutes: number = Utils.getDurationMinsByAppointmentTypeId(appointmentTypeId);

    const result : TimeRange[] = appointmentDateRange.reduce((ac, adr) => 
      moment(adr.start)
        .add(appointmentMinutes, 'm')
        .isSameOrBefore(adr.end) ? 
          [...ac, { start: adr.start.toDate(), end: adr.end.toDate() }] :
          ac, []
    );

    return result;
  }
}
