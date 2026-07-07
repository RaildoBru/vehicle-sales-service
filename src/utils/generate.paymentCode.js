import crypto from 'crypto';

export function generatePaymentCode() {
  return `PAY-${crypto.randomUUID()}`;
}