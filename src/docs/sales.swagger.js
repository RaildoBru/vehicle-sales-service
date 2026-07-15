/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   vehicleId:
 *                     type: string
 *                   buyerCpf:
 *                     type: string
 *                   status:
 *                     type: string
 *             example:
 *               - _id: "6874c1f2d9a3c4e5f6a7b8c9"
 *                 vehicleId: "123"
 *                 buyerCpf: "12345678900"
 *                 paymentCode: "PAY-987654"
 *                 status: "APPROVED"
 *               - _id: "6874c1f2d9a3c4e5f6a7b8ca"
 *                 vehicleId: "456"
 *                 buyerCpf: "98765432100"
 *                 paymentCode: "PAY-123456"
 *                 status: "PENDING"
 *
 *   post:
 *     summary: Criar uma venda
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicleId
 *               - cpf
 *             properties:
 *               vehicleId:
 *                 type: string
 *               cpf:
 *                 type: string
 *                 example: "00000000091"
 *     responses:
 *       201:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vehicleId:
 *                   type: string
 *                 buyerCpf:
 *                   type: string
 *                 paymentCode:
 *                   type: string
 *                 status:
 *                   type: string
 *                   enum: [PENDING, APPROVED, REJECTED]
 * 
 *       400:
 *         description: Erro de validação ou dados inválidos
 */