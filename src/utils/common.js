import { isAbsoluteUrl } from '@tager/admin-services';

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

export function parseUserResponse(response) {
  if (
    typeof response === 'object' &&
    typeof response.name === 'string' &&
    typeof response.email === 'string'
  )
    return { name: response.name, email: response.email };

  throw new Error('Invalid user profile response');
}
