import { environment, isAbsoluteUrl } from "@tager/admin-services";

export function getLogoUrl(logoPath: string) {
  if (!logoPath) return null;

  return isAbsoluteUrl(logoPath) ? logoPath : environment.baseUrl + logoPath;
}

export function isDevelopment() {
  return environment.nodeEnv === "development";
}

export function isProduction() {
  return environment.nodeEnv === "production";
}
