import express from 'express';
import request from 'supertest';

jest.mock('../src/services/sale.service.js');
import SaleService from '../src/services/sale.service.js';
import saleRoutes from '../src/routes/index.js';

describe('Sale Controller Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', saleRoutes);
    jest.clearAllMocks();
  });

  it('GET /sales should return 200 and sales', async () => {
    SaleService.getAllSales = jest.fn().mockResolvedValue([{ id: '1' }]);

    const res = await request(app).get('/sales');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: '1' }]);
    expect(SaleService.getAllSales).toHaveBeenCalled();
  });

  it('POST /sales should create sale and return 201', async () => {
    const payload = { vehicleId: 'v1', cpf: '123' };
    SaleService.createSale = jest.fn().mockResolvedValue({ id: 's1' });

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 's1' });
    expect(SaleService.createSale).toHaveBeenCalledWith({ vehicleId: 'v1', buyerCpf: '123' });
  });

  it('POST /sales should return 400 on error', async () => {
    const payload = { vehicleId: 'v1', cpf: '123' };
    SaleService.createSale = jest.fn().mockRejectedValue(new Error('bad data'));

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
