import { AppointmentTypeId } from '../src/enums';
import { AppointmentAvailabilityDeps } from '../src/interfaces';
import { AppointmentAvailability } from '../src/main';
import { TimeRange } from '../src/types';

describe('AppointmentAvailability', () => {
  const provider1Id = 'provider-1';

  it('correctly returns availability with a single booked appointment and calendar event', async () => {
    const deps: AppointmentAvailabilityDeps = {
      getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
        return [
          {
            calenderEventId: 'calendar-1',
            start: new Date('2020-07-01T13:45:00.000Z'),
            end: new Date('2020-07-01T14:15:00.000Z'),
          },
        ];
      },
      getBookedAppointments: async (
        providerId: string,
        start: Date,
        end: Date,
      ) => {
        return [
          {
            appointmentId: 'appointment-1',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T15:00:00.000Z'),
          },
        ];
      },
    };

    const appointmentAvailability = new AppointmentAvailability(deps);
    const start = new Date('2020-07-01T13:00:00.000Z');
    const end = new Date('2020-07-01T17:00:00.000Z');

    const result = await appointmentAvailability.getAvailableTimeRanges(
      provider1Id,
      AppointmentTypeId.FOLLOWUP_30,
      start,
      end,
    );

    const expectedResult: TimeRange[] = [
      {
        // - range 1: start: July 1, 2020 @ 1pm, end: July 1, 2020 @ 1:45pm
        start: new Date('2020-07-01T13:00:00.000Z'),
        end: new Date('2020-07-01T13:45:00.000Z'),
      },
      {
        // - range 2: start: July 1, 2020 @ 2:15pm, end: July 1, 2020 @ 3:00pm
        start: new Date('2020-07-01T14:15:00.000Z'),
        end: new Date('2020-07-01T15:00:00.000Z'),
      },
      {
        // - range 3: start: July 1, 2020 @ 4pm, end: July 1, 2020 @ 5pm
        start: new Date('2020-07-01T16:00:00.000Z'),
        end: new Date('2020-07-01T17:00:00.000Z'),
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});


describe('AppointmentAvailability2', () => {
  const provider1Id = 'provider-1';

  it('correctly returns availability with booked appointments and calendar events', async () => {
    const deps: AppointmentAvailabilityDeps = {
      getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
        return [
          {
            calenderEventId: 'calendar-1',
            start: new Date('2020-07-01T13:45:00.000Z'),
            end: new Date('2020-07-01T14:15:00.000Z'),
          },
          {
            calenderEventId: 'calendar-2',
            start: new Date('2020-07-01T14:13:00.000Z'),
            end: new Date('2020-07-01T14:16:00.000Z'),
          },
        ];
      },
      getBookedAppointments: async (
        providerId: string,
        start: Date,
        end: Date,
      ) => {
        return [
          {
            appointmentId: 'appointment-1',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T15:00:00.000Z'),
          },
        ];
      },
    };

    const appointmentAvailability = new AppointmentAvailability(deps);
    const start = new Date('2020-07-01T13:00:00.000Z');
    const end = new Date('2020-07-01T17:00:00.000Z');

    const result = await appointmentAvailability.getAvailableTimeRanges(
      provider1Id,
      AppointmentTypeId.FOLLOWUP_30,
      start,
      end,
    );

    const expectedResult: TimeRange[] = [
      {
        // - range 1: start: July 1, 2020 @ 1pm, end: July 1, 2020 @ 1:45pm
        start: new Date('2020-07-01T13:00:00.000Z'),
        end: new Date('2020-07-01T13:45:00.000Z'),
      },
      {
        // - range 2: start: July 1, 2020 @ 2:16pm, end: July 1, 2020 @ 3:00pm
        start: new Date('2020-07-01T14:16:00.000Z'),
        end: new Date('2020-07-01T15:00:00.000Z'),
      },
      {
        // - range 3: start: July 1, 2020 @ 4pm, end: July 1, 2020 @ 5pm
        start: new Date('2020-07-01T16:00:00.000Z'),
        end: new Date('2020-07-01T17:00:00.000Z'),
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});


describe('AppointmentAvailability3', () => {
  const provider1Id = 'provider-1';

  it('correctly returns availability with booked appointments and calendar events', async () => {
    const deps: AppointmentAvailabilityDeps = {
      getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
        return [
          {
            calenderEventId: 'calendar-1',
            start: new Date('2020-07-01T13:45:00.000Z'),
            end: new Date('2020-07-01T14:15:00.000Z'),
          },
          {
            calenderEventId: 'calendar-2',
            start: new Date('2020-07-01T14:13:00.000Z'),
            end: new Date('2020-07-01T14:16:00.000Z'),
          },
        ];
      },
      getBookedAppointments: async (
        providerId: string,
        start: Date,
        end: Date,
      ) => {
        return [
          {
            appointmentId: 'appointment-1',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T15:00:00.000Z'),
          },
        ];
      },
    };

    const appointmentAvailability = new AppointmentAvailability(deps);
    const start = new Date('2020-07-01T13:00:00.000Z');
    const end = new Date('2020-07-01T17:00:00.000Z');

    const result = await appointmentAvailability.getAvailableTimeRanges(
      provider1Id,
      AppointmentTypeId.NEW_PATIENT_60,
      start,
      end,
    );

    const expectedResult: TimeRange[] = [
      {
        // - range 1: start: July 1, 2020 @ 4pm, end: July 1, 2020 @ 5pm
        start: new Date('2020-07-01T16:00:00.000Z'),
        end: new Date('2020-07-01T17:00:00.000Z'),
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});


describe('AppointmentAvailability4', () => {
  const provider1Id = 'provider-1';

  it('correctly returns availability with booked appointments and calendar events', async () => {
    const deps: AppointmentAvailabilityDeps = {
      getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
        return [
          {
            calenderEventId: 'calendar-1',
            start: new Date('2020-07-01T13:45:00.000Z'),
            end: new Date('2020-07-01T14:15:00.000Z'),
          },
          {
            calenderEventId: 'calendar-2',
            start: new Date('2020-07-01T14:13:00.000Z'),
            end: new Date('2020-07-01T14:16:00.000Z'),
          },
        ];
      },
      getBookedAppointments: async (
        providerId: string,
        start: Date,
        end: Date,
      ) => {
        return [
          {
            appointmentId: 'appointment-1',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T15:00:00.000Z'),
          },
          {
            appointmentId: 'appointment-2',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T16:00:00.000Z'),
          },
        ];
      },
    };

    const appointmentAvailability = new AppointmentAvailability(deps);
    const start = new Date('2020-07-01T13:00:00.000Z');
    const end = new Date('2020-07-01T17:00:00.000Z');

    const result = await appointmentAvailability.getAvailableTimeRanges(
      provider1Id,
      AppointmentTypeId.NEW_PATIENT_60,
      start,
      end,
    );

    const expectedResult: TimeRange[] = [];

    expect(result).toEqual(expectedResult);
  });
});


describe('AppointmentAvailability5', () => {
  const provider1Id = 'provider-1';

  it('correctly returns availability with booked appointments and calendar events', async () => {
    const deps: AppointmentAvailabilityDeps = {
      getCalendarEvents: async (providerId: string, start: Date, end: Date) => {
        return [
          {
            calenderEventId: 'calendar-1',
            start: new Date('2020-07-01T13:45:00.000Z'),
            end: new Date('2020-07-01T14:15:00.000Z'),
          },
          {
            calenderEventId: 'calendar-2',
            start: new Date('2020-07-01T14:13:00.000Z'),
            end: new Date('2020-07-01T14:16:00.000Z'),
          },
        ];
      },
      getBookedAppointments: async (
        providerId: string,
        start: Date,
        end: Date,
      ) => {
        return [
          {
            appointmentId: 'appointment-1',
            appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
            start: new Date('2020-07-01T15:00:00.000Z'),
          },
          {
            appointmentId: 'appointment-3',
            appointmentTypeId: AppointmentTypeId.FOLLOWUP_15,
            start: new Date('2020-07-01T13:30:00.000Z'),
          },
        ];
      },
    };

    const appointmentAvailability = new AppointmentAvailability(deps);
    const start = new Date('2020-07-01T13:00:00.000Z');
    const end = new Date('2020-07-01T17:00:00.000Z');

    const result = await appointmentAvailability.getAvailableTimeRanges(
      provider1Id,
      AppointmentTypeId.FOLLOWUP_30,
      start,
      end,
    );

    const expectedResult: TimeRange[] = [
      {
        // - range 1: start: July 1, 2020 @ 1pm, end: July 1, 2020 @ 1:30pm
        start: new Date('2020-07-01T13:00:00.000Z'),
        end: new Date('2020-07-01T13:30:00.000Z'),
      },
      {
        // - range 2: start: July 1, 2020 @ 2:16pm, end: July 1, 2020 @ 3:00pm
        start: new Date('2020-07-01T14:16:00.000Z'),
        end: new Date('2020-07-01T15:00:00.000Z'),
      },
      {
        // - range 3: start: July 1, 2020 @ 4pm, end: July 1, 2020 @ 5pm
        start: new Date('2020-07-01T16:00:00.000Z'),
        end: new Date('2020-07-01T17:00:00.000Z'),
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});