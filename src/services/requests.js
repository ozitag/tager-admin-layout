import { request } from '@tager/admin-services';

export function signOut() {
  return request.post({ path: '/self/logout' });
}

export function getUserProfile() {
  return request.get({ path: '/self' });
}

export function updateUserProfile(payload) {
  return request.post({ path: '/self', body: payload });
}

export function updateUserPassword(payload) {
  return request.post({ path: '/self/password', body: payload });
}
