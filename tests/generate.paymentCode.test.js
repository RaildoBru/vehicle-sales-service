import * as gen from '../src/utils/generate.paymentCode.js';
import crypto from 'crypto';

describe('generatePaymentCode', () => {
  it('should return PAY- plus uuid', () => {
    const old = crypto.randomUUID;
    crypto.randomUUID = jest.fn().mockReturnValue('ABC-UUID');

    const code = gen.generatePaymentCode();

    expect(code).toBe('PAY-ABC-UUID');

    crypto.randomUUID = old;
  });
});
