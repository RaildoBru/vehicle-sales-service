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

  it('GET /sales should return 500 on error', async () => {
    SaleService.getAllSales = jest.fn().mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/sales');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /sales should create sale and return 201', async () => {
    const payload = { vehicleId: 'v1', cpf: '45678901234' };
    SaleService.createSale = jest.fn().mockResolvedValue({ id: 's1' });

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 's1' });
    expect(SaleService.createSale).toHaveBeenCalledWith({ vehicleId: 'v1', buyerCpf: '45678901234' });
  });

  it('POST /sales should return 400 on invalid cpf', async () => {
    const payload = { vehicleId: 'v1', cpf: '123' };

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid CPF' });
  });

  it('POST /sales should return 400 when missing vehicleId', async () => {
    const payload = { cpf: '45678901234' };

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'vehicleId and cpf are required' });
  });

  it('POST /sales should return 400 when missing cpf', async () => {
    const payload = { vehicleId: 'v1' };

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'vehicleId and cpf are required' });
  });

  it('POST /sales should return 400 on service error', async () => {
    const payload = { vehicleId: 'v1', cpf: '45678901234' };
    SaleService.createSale = jest.fn().mockRejectedValue(new Error('bad data'));

    const res = await request(app).post('/sales').send(payload);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
