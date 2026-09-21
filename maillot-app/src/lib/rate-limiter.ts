// Rate limiter simple en mémoire pour l'endpoint de login
// Bloque après 5 tentatives échouées pendant 15 minutes

const attempts = new Map<string, { count: number; firstAttempt: number }>();

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record) {
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, resetIn: 0 };
  }

  // Reset si la fenêtre de blocage est expirée
  if (now - record.firstAttempt > BLOCK_DURATION_MS) {
    attempts.delete(ip);
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, resetIn: 0 };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const resetIn = Math.ceil((BLOCK_DURATION_MS - (now - record.firstAttempt)) / 1000 / 60);
    return { allowed: false, remaining: 0, resetIn };
  }

  return { allowed: true, remaining: MAX_ATTEMPTS - record.count - 1, resetIn: 0 };
}

export function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.firstAttempt > BLOCK_DURATION_MS) {
    attempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    record.count++;
  }
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}
