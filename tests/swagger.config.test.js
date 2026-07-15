import { swaggerSpec } from '../src/docs/config/swagger.js';

describe('Swagger Configuration', () => {
  it('should generate swagger spec successfully', () => {
    expect(swaggerSpec).toBeDefined();
  });

  it('should have openapi version defined', () => {
    expect(swaggerSpec.openapi).toBe('3.0.0');
  });

  it('should have info defined', () => {
    expect(swaggerSpec.info).toBeDefined();
    expect(swaggerSpec.info.title).toBe('Vehicle Sales API');
    expect(swaggerSpec.info.version).toBe('1.0.0');
  });

  it('should have servers configured', () => {
    expect(swaggerSpec.servers).toBeDefined();
    expect(swaggerSpec.servers.length).toBeGreaterThan(0);
  });

  it('should have tags defined', () => {
    expect(swaggerSpec.tags).toBeDefined();
    expect(swaggerSpec.tags.length).toBeGreaterThan(0);
  });

  it('should have Health tag', () => {
    const healthTag = swaggerSpec.tags.find(tag => tag.name === 'Health');
    expect(healthTag).toBeDefined();
    expect(healthTag.description).toBe('Rota de verificação de saúde da API');
  });

  it('should have Sales tag', () => {
    const salesTag = swaggerSpec.tags.find(tag => tag.name === 'Sales');
    expect(salesTag).toBeDefined();
    expect(salesTag.description).toBe('Rotas relacionadas a vendas de veículos');
  });

  it('should have Webhooks tag', () => {
    const webhooksTag = swaggerSpec.tags.find(tag => tag.name === 'Webhooks');
    expect(webhooksTag).toBeDefined();
    expect(webhooksTag.description).toBe('Rotas relacionadas a webhooks');
  });

  it('should have paths defined', () => {
    expect(swaggerSpec.paths).toBeDefined();
    expect(Object.keys(swaggerSpec.paths).length).toBeGreaterThan(0);
  });

  it('should have health endpoint documented', () => {
    expect(swaggerSpec.paths['/health']).toBeDefined();
  });

  it('should have sales endpoint documented', () => {
    expect(swaggerSpec.paths['/sales']).toBeDefined();
  });

  it('should have webhook endpoint documented', () => {
    expect(swaggerSpec.paths['/webhooks/payment']).toBeDefined();
  });
});
