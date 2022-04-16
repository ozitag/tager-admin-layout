import { request } from "@tager/admin-services";

export function signOut(): Promise<{ success: boolean }> {
  return request.post({ path: "/admin/self/logout" });
}

export interface UserProfileType {
  name: string;
  email: string;
}

export function getUserProfile(): Promise<{
  data: UserProfileType;
}> {
  return request.get({ path: "/admin/self" });
}

interface UpdateProfilePayload {
  name: string;
  email: string;
}

export function updateUserProfile(payload: UpdateProfilePayload) {
  return request.post({ path: "/admin/self", body: payload });
}

interface UpdatePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export function updateUserPassword(
  payload: UpdatePasswordPayload
): Promise<void> {
  return request.post({ path: "/admin/self/password", body: payload });
}
