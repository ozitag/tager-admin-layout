import { removeAccessToken, isAbsoluteUrl } from '@tager/admin-services';

export function getLogoUrl(logoPath) {
  if (!logoPath) return null;

  return isAbsoluteUrl(logoPath) ? logoPath : process.env.BASE_URL + logoPath;
}

export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export function removeTokenAndRedirectToLogin() {
  removeAccessToken();

  if (isProduction()) {
    window.location.href = '/admin/auth';
  }
}
