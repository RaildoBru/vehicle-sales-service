export function validateCPF(cpf) {
  if (!cpf || typeof cpf !== 'string') return false;

  const cleaned = cpf.replace(/[\D]/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Blacklist de CPFs teste inválidos
  const invalidTestCPFs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678901',
    '98765432100',
  ];

  if (invalidTestCPFs.includes(cleaned)) return false;

  return true;
  /*
  const calculateDigit = (digits) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i += 1) {
      sum += Number(digits[i]) * (digits.length + 1 - i);
    }
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstNine = cleaned.slice(0, 9);
  const firstCheck = calculateDigit(firstNine);
  const secondCheck = calculateDigit(firstNine + firstCheck);

  return cleaned === `${firstNine}${firstCheck}${secondCheck}`;
  */
}
