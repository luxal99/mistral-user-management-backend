import { InjectionToken } from "@nestjs/common";

export const DATABASE_INJECTION_TOKEN = "DATA_SOURCE";
export const PERMISSION_REPOSITORY_INJECTION_TOKEN: InjectionToken =
  "PERMISSION_REPOSITORY";


export const USER_REPOSITORY_INJECTION_TOKEN: InjectionToken =
  "USER_REPOSITORY";
