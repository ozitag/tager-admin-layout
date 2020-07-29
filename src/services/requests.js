import { request } from '@tager/admin-services';

export function signOut() {
  return request.post({ path: '/admin/self/logout' });
}

export function getUserProfile() {
  return request.get({ path: '/admin/self' });
}

export function updateUserProfile(payload) {
  return request.post({ path: '/admin/self', body: payload });
}

export function updateUserPassword(payload) {
  return request.post({ path: '/admin/self/password', body: payload });
}
