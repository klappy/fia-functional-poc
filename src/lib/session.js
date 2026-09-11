import { SESSION_KEY, initialSession, validateSession } from './flow.js';
export function restoreSession(storage, guide, cues) {
  try {
    const raw = storage?.getItem(SESSION_KEY);
    if (!raw) return { session: initialSession(guide), restored: false, storageError: false };
    const value = JSON.parse(raw);
    const session = validateSession(value, guide, cues);
    return { session, restored: value.unitId === session.unitId && value.stepId === session.stepId, storageError: false };
  } catch { return { session: initialSession(guide), restored: false, storageError: true }; }
}
export function persistSession(storage, session) {
  try { storage.setItem(SESSION_KEY, JSON.stringify(session)); return true; } catch { return false; }
}

export function browserStorage() { try { return window.localStorage; } catch { return null; } }
