import PaymentWebhookController from '../src/controllers/payment.webhook.controller.js';
import PaymentWebhookService from '../src/services/payment.webhook.service.js';

jest.mock('../src/services/payment.webhook.service.js');

describe('PaymentWebhookController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 when service executes successfully', async () => {
    PaymentWebhookService.execute = jest.fn().mockResolvedValue();

    const req = { body: { paymentCode: 'PC', status: 'PAID' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await PaymentWebhookController.handle(req, res);

    expect(PaymentWebhookService.execute).toHaveBeenCalledWith('PC', 'PAID');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Webhook processed successfully' });
  });

  it('should return 400 when service throws', async () => {
    PaymentWebhookService.execute = jest.fn().mockRejectedValue(new Error('fail'));

    const req = { body: { paymentCode: 'PC', status: 'FAILED' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await PaymentWebhookController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid webhook payload' });
  });
});
