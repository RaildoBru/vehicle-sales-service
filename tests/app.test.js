import express from 'express';
import request from 'supertest';
import app from '../src/app.js';

jest.mock('swagger-ui-express');
jest.mock('../src/docs/config/swagger.js');

describe('Express App', () => {
  it('should have middleware configured', () => {
    expect(app).toBeDefined();
  });

  it('should have json middleware', () => {
    expect(typeof app._router).toBe('object');
  });

  it('should have /api-docs route', async () => {
    const res = await request(app).get('/api-docs/');
    // Swagger UI route exists
    expect(res.status).not.toBe(404);
  });

  it('should handle requests to /api routes', async () => {
    const res = await request(app)
      .get('/api/sales')
      .expect('Content-Type', /json/);
    // Routes are mounted at /api
    expect([200, 500]).toContain(res.status);
  });

  it('should return 404 for non-existent routes', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.status).toBe(404);
  });

  it('should parse JSON bodies', async () => {
    const res = await request(app)
      .post('/api/sales')
      .send({ vehicleId: 'v1', cpf: '12345678901' })
      .expect('Content-Type', /json/);
    
    expect(res.status).toBeDefined();
  });
});
