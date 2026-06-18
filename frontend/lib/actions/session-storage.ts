import { GenderSession } from "@/types";

const KEY = "gender_session";

export function saveSession(session: GenderSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function getSession(): GenderSession | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
