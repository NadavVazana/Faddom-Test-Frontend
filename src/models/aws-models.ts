export interface CpuInfoItem {
  timestamp: string;
  cpuUsage: number;
}

export enum PeriodType {
  LAST_DAY = "day",
  LAST_WEEK = "week",
  LAST_MONTH = "month",
}
