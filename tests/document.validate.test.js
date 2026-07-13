import * as doc from '../src/utils/document.validate.js';

describe('validateCPF', () => {
  it('should return true for valid CPF', () => {
    expect(doc.validateCPF('123.456.789-09')).toBe(true);
  });

  it('should return false for invalid CPF', () => {
    expect(doc.validateCPF('123.456.789-01')).toBe(false);
  });

  it('should return false for empty CPF', () => {
    expect(doc.validateCPF('')).toBe(false);
  });

  it('should return false for non-string CPF', () => {
    expect(doc.validateCPF(12345678909)).toBe(false);
  });

  it('should return false for CPF with less than 11 digits', () => {
    expect(doc.validateCPF('123.456.789-0')).toBe(false);
  });

  it('should return false for CPF with more than 11 digits', () => {
    expect(doc.validateCPF('123.456.789-090')).toBe(false);
  });

  it('should return false for CPF with all same digits', () => {
    expect(doc.validateCPF('111.111.111-11')).toBe(false);
  });
});