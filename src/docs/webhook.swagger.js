/**
 * @swagger
 * /webhooks/payment:
 *   post:
 *     summary: Recebe notificações de eventos de pagamento
 *     tags: [Webhooks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: payment_approved
 *               paymentCode:
 *                 type: string
 *                 example: PAY-123456
 *               status:
 *                 type: string
 *                 example: approved
 *     responses:
 *       200:
 *         description: Notificação recebida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Webhook processed successfully
 *       400:
 *         description: Erro ao processar a notificação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid webhook payload
 */


{}