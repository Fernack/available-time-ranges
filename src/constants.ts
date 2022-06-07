import { AppointmentTypeId } from "./enums";
import { AppointmentType } from "./types";

export const appointmentTypes: AppointmentType[] = [
    {
      appointmentTypeId: AppointmentTypeId.FOLLOWUP_15,
      name: '15 min Follow Up',
      durationMins: 15,
    },
    {
      appointmentTypeId: AppointmentTypeId.FOLLOWUP_30,
      name: '30 min Follow Up',
      durationMins: 30,
    },
    {
      appointmentTypeId: AppointmentTypeId.NEW_PATIENT_60,
      name: '60 min New Patient',
      durationMins: 60,
    },
  ];