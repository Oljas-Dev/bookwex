export function getPasswordStrength(password: string) {
  let score = 0;

  if (!password) return 0;

  // length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;

  // character variety
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return Math.min(score, 4);
}
