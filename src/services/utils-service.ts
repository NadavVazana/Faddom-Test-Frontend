import { PeriodType } from "../models/aws-models";

export const getTimeRange = (range: string) => {
  const now = new Date();

  let startDate: Date;
  let endDate = new Date(now);
  let periodType = PeriodType.LAST_DAY;

  switch (range) {
    case "lastDay":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
      break;

    case "lastWeek":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      periodType = PeriodType.LAST_WEEK;
      break;

    case "lastMonth":
      startDate = new Date(now);
      // To get the last month (lastMonth starts from the previous month), subtract 1 from the current month.
      startDate.setMonth(now.getMonth() - 1);
      if (now.getMonth() === 0) {
        // If current month is January (0), set startDate to December of the previous year.
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setMonth(11); // December is month 11.
      }
      periodType = PeriodType.LAST_MONTH;
      break;

    default:
      throw new Error("Invalid range type");
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    periodType,
  };
};

export const getDayOfWeek = (dayNumber: number): string => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[dayNumber - 1];
};
