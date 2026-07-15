// mock model
jest.mock('../src/models/sale.model.js');

import SaleRepository from '../src/repositories/sale.repository.js';
import Sale from '../src/models/sale.model.js';

describe('SaleRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAllSales should return results', async () => {
    Sale.find = jest.fn().mockResolvedValue([{ id: '1' }]);
    const res = await SaleRepository.getAllSales();
    expect(res).toEqual([{ id: '1' }]);
    expect(Sale.find).toHaveBeenCalled();
  });

  it('getAllSales should throw error on failure', async () => {
    const error = new Error('DB error');
    Sale.find = jest.fn().mockRejectedValue(error);
    await expect(SaleRepository.getAllSales()).rejects.toThrow('Failed to get all sales');
  });

  it('createSale should create and return sale', async () => {
    const data = { vehicleId: 'v1' };
    Sale.create = jest.fn().mockResolvedValue({ id: 's1', ...data });
    const res = await SaleRepository.createSale(data);
    expect(res).toEqual({ id: 's1', ...data });
    expect(Sale.create).toHaveBeenCalledWith(expect.objectContaining(data));
  });

  it('createSale should throw error on failure', async () => {
    const data = { vehicleId: 'v1' };
    const error = new Error('DB error');
    Sale.create = jest.fn().mockRejectedValue(error);
    await expect(SaleRepository.createSale(data)).rejects.toThrow('Failed to create sale');
  });

  it('findByPaymentCode should return sale', async () => {
    Sale.findOne = jest.fn().mockResolvedValue({ id: 's2', paymentCode: 'pc' });
    const res = await SaleRepository.findByPaymentCode('pc');
    expect(res).toEqual({ id: 's2', paymentCode: 'pc' });
    expect(Sale.findOne).toHaveBeenCalledWith({ paymentCode: 'pc' });
  });

  it('findByPaymentCode should throw error on failure', async () => {
    const error = new Error('DB error');
    Sale.findOne = jest.fn().mockRejectedValue(error);
    await expect(SaleRepository.findByPaymentCode('pc')).rejects.toThrow('Failed to find sale by payment code');
  });

  it('updateStatus should call findByIdAndUpdate', async () => {
    Sale.findByIdAndUpdate = jest.fn().mockResolvedValue({ id: 's3', status: 'APPROVED' });
    const res = await SaleRepository.updateStatus('s3', 'APPROVED');
    expect(res).toEqual({ id: 's3', status: 'APPROVED' });
    expect(Sale.findByIdAndUpdate).toHaveBeenCalledWith('s3', { status: 'APPROVED' }, { new: true });
  });

  it('updateStatus should throw error on failure', async () => {
    const error = new Error('DB error');
    Sale.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
    await expect(SaleRepository.updateStatus('s3', 'APPROVED')).rejects.toThrow('Failed to update sale status');
  });
});
