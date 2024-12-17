import { httpService } from "./http-service";

export const getCpuUsage = async (
  startTime: string,
  endTime: string,
  period: number,
  ipAddress: string
) => {
  try {
    return await httpService.get("aws/cpu-usage", {
      startTime,
      endTime,
      period,
      ipAddress,
    });
  } catch (error) {
    throw error;
  }
};
