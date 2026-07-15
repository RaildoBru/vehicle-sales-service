import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vehicle Sales API',
      version: '1.0.0',
      description: 'API para gerenciamento de vendas de veículos'
    },
    tags: [
      {
        name: 'Health',
        description: 'Rota de verificação de saúde da API'
      },
      {
        name: 'Sales',
        description: 'Rotas relacionadas a vendas de veículos'
      },
      {
        name: 'Webhooks',
        description: 'Rotas relacionadas a webhooks'
      }
    ],
    servers: [
      {
        url: "http://localhost:" + process.env.PORT + "/api"
      }
    ]
  },
  apis: ['./src/docs/*.js']
};

export const swaggerSpec = swaggerJsdoc(options);