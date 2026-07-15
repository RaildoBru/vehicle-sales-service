jest.mock('../src/repositories/sale.repository.js');
jest.mock('../src/clients/vehicle.service.client.js');

import PaymentWebhookService from '../src/services/payment.webhook.service.js';
import SaleRepository from '../src/repositories/sale.repository.js';
import VehicleServiceClient from '../src/clients/vehicle.service.client.js';
import SaleStatus from '../src/enums/sale-status.enum.js';

describe('PaymentWebhookService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw when sale not found', async () => {
    SaleRepository.findByPaymentCode = jest.fn().mockResolvedValue(null);
    await expect(PaymentWebhookService.execute('pc', 'approved')).rejects.toThrow('Sale not found');
  });

  it('should mark vehicle as sold when approved', async () => {
    const sale = { _id: 's1', vehicleId: 'v1' };
    SaleRepository.findByPaymentCode = jest.fn().mockResolvedValue(sale);
    SaleRepository.updateStatus = jest.fn().mockResolvedValue({ ...sale, status: SaleStatus.APPROVED });
    VehicleServiceClient.markAsSold = jest.fn().mockResolvedValue();

    await PaymentWebhookService.execute('pc', 'payment_approved');

    expect(SaleRepository.updateStatus).toHaveBeenCalledWith('s1', SaleStatus.APPROVED);
    expect(VehicleServiceClient.markAsSold).toHaveBeenCalledWith('v1');
    expect(VehicleServiceClient.markAsAvailable).not.toHaveBeenCalled();
  });

  it('should mark vehicle as available when rejected', async () => {
    const sale = { _id: 's2', vehicleId: 'v2' };
    SaleRepository.findByPaymentCode = jest.fn().mockResolvedValue(sale);
    SaleRepository.updateStatus = jest.fn().mockResolvedValue({ ...sale, status: SaleStatus.REJECTED });
    VehicleServiceClient.markAsAvailable = jest.fn().mockResolvedValue();

    await PaymentWebhookService.execute('pc', 'payment_rejected');

    expect(SaleRepository.updateStatus).toHaveBeenCalledWith('s2', SaleStatus.REJECTED);
    expect(VehicleServiceClient.markAsAvailable).toHaveBeenCalledWith('v2');
    expect(VehicleServiceClient.markAsSold).not.toHaveBeenCalled();
  });

  it('should handle case-insensitive status comparison', async () => {
    const sale = { _id: 's3', vehicleId: 'v3' };
    SaleRepository.findByPaymentCode = jest.fn().mockResolvedValue(sale);
    SaleRepository.updateStatus = jest.fn().mockResolvedValue({ ...sale, status: SaleStatus.APPROVED });
    VehicleServiceClient.markAsSold = jest.fn().mockResolvedValue();

    await PaymentWebhookService.execute('pc', 'PAYMENT_APPROVED');

    expect(SaleRepository.updateStatus).toHaveBeenCalledWith('s3', SaleStatus.APPROVED);
    expect(VehicleServiceClient.markAsSold).toHaveBeenCalledWith('v3');
  });

  it('should handle case-insensitive status for rejected', async () => {
    const sale = { _id: 's4', vehicleId: 'v4' };
    SaleRepository.findByPaymentCode = jest.fn().mockResolvedValue(sale);
    SaleRepository.updateStatus = jest.fn().mockResolvedValue({ ...sale, status: SaleStatus.REJECTED });
    VehicleServiceClient.markAsAvailable = jest.fn().mockResolvedValue();

    await PaymentWebhookService.execute('pc', 'PAYMENT_REJECTED');

    expect(SaleRepository.updateStatus).toHaveBeenCalledWith('s4', SaleStatus.REJECTED);
    expect(VehicleServiceClient.markAsAvailable).toHaveBeenCalledWith('v4');
  });
});
