jest.mock('mongoose');

import mongoose from 'mongoose';
import connectDatabase from '../src/database/database.config.js';

describe('Database Config', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.DATABASE_URL;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should connect to MongoDB successfully', async () => {
    process.env.DATABASE_URL = 'mongodb://localhost:27017/test';
    mongoose.connect = jest.fn().mockResolvedValue();

    await connectDatabase();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/test');
  });

  it('should log success message when connected', async () => {
    process.env.DATABASE_URL = 'mongodb://localhost:27017/test';
    mongoose.connect = jest.fn().mockResolvedValue();
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    await connectDatabase();

    expect(consoleSpy).toHaveBeenCalledWith('MongoDB conectado');
    consoleSpy.mockRestore();
  });

  it('should log error and exit on connection failure', async () => {
    process.env.DATABASE_URL = 'mongodb://invalid';
    const error = new Error('Connection failed');
    mongoose.connect = jest.fn().mockRejectedValue(error);
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation();

    await connectDatabase();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao conectar ao MongoDB:', error);
    expect(processExitSpy).toHaveBeenCalledWith(1);

    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });
});
