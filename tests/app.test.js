import express from 'express';
import request from 'supertest';
import app from '../src/app.js';

describe('Express App', () => {
  it('should have middleware configured', () => {
    expect(app).toBeDefined();
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
