import PaymentWebhookService from '../services/payment.webhook.service.js';

class PaymentWebhookController {
    async handle(req, res) {

        const {
                paymentCode,
                status,
                event
            } = req.body;

        try {
            await PaymentWebhookService.execute(
                paymentCode,
                status,
            );

            return res.status(200).json({
                message: 'Webhook processed successfully'
            });

        } catch (error) {

            return res.status(400).json({
                error: 'Invalid webhook payload'
            });

        }
    }
}

export default new PaymentWebhookController();