// mocks
jest.mock('../src/repositories/sale.repository.js');
jest.mock('../src/clients/vehicle.service.client.js');
jest.mock('../src/utils/generate.paymentCode.js');

import SaleService from '../src/services/sale.service.js';
import SaleRepository from '../src/repositories/sale.repository.js';
import VehicleServiceClient from '../src/clients/vehicle.service.client.js';
import { generatePaymentCode } from '../src/utils/generate.paymentCode.js';

describe('SaleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllSales', () => {
    it('should return sales when repository succeeds', async () => {
      const mockSales = [{ id: '1' }];
      SaleRepository.getAllSales = jest.fn().mockResolvedValue(mockSales);

      const result = await SaleService.getAllSales();

      expect(result).toEqual(mockSales);
      expect(SaleRepository.getAllSales).toHaveBeenCalled();
    });

    it('should throw when repository throws', async () => {
      SaleRepository.getAllSales = jest.fn().mockRejectedValue(new Error('DB error'));

      await expect(SaleService.getAllSales()).rejects.toThrow('Failed to get all sales: DB error');
    });
  });

  describe('createSale', () => {
    it('should create sale and notify vehicle service', async () => {
      const data = { vehicleId: 'v1', buyerCpf: '123' };
      generatePaymentCode.mockReturnValue('PAYCODE');
      const createdSale = { id: 's1', vehicleId: 'v1' };
      SaleRepository.createSale = jest.fn().mockResolvedValue(createdSale);
      VehicleServiceClient.markAsPendingPayment = jest.fn().mockResolvedValue();

      const result = await SaleService.createSale(data);

      expect(generatePaymentCode).toHaveBeenCalled();
      expect(SaleRepository.createSale).toHaveBeenCalledWith(expect.objectContaining({ paymentCode: 'PAYCODE' }));
      expect(VehicleServiceClient.markAsPendingPayment).toHaveBeenCalledWith('v1');
      expect(result).toEqual(createdSale);
    });

    it('should throw a wrapped error when repository fails', async () => {
      const data = { vehicleId: 'v2', buyerCpf: '456' };
      generatePaymentCode.mockReturnValue('PC2');
      SaleRepository.createSale = jest.fn().mockRejectedValue(new Error('create failed'));

      await expect(SaleService.createSale(data)).rejects.toThrow('Failed to create sale: create failed');
    });
  });
});
