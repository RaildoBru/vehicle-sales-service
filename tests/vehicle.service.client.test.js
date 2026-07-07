import axios from 'axios';
import VehicleServiceClient from '../src/clients/vehicle.service.client.js';

jest.mock('axios');

describe('VehicleServiceClient', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, VEHICLE_SERVICE_URL: 'http://vehicle-service' };
    jest.clearAllMocks();
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('markAsSold should call axios.patch with SOLD', async () => {
    axios.patch = jest.fn().mockResolvedValue({});
    await VehicleServiceClient.markAsSold('v1');
    expect(axios.patch).toHaveBeenCalledWith('http://vehicle-service/vehicles/v1/status', { status: 'SOLD' });
  });

  it('markAsAvailable should call axios.patch with AVAILABLE', async () => {
    axios.patch = jest.fn().mockResolvedValue({});
    await VehicleServiceClient.markAsAvailable('v2');
    expect(axios.patch).toHaveBeenCalledWith('http://vehicle-service/vehicles/v2/status', { status: 'AVAILABLE' });
  });

  it('markAsPendingPayment should call axios.patch with PENDING_PAYMENT', async () => {
    axios.patch = jest.fn().mockResolvedValue({});
    await VehicleServiceClient.markAsPendingPayment('v3');
    expect(axios.patch).toHaveBeenCalledWith('http://vehicle-service/vehicles/v3/status', { status: 'PENDING_PAYMENT' });
  });
});
