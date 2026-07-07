import PaymentWebhookService from '../services/payment.webhook.service.js';

class PaymentWebhookController {

    async handle(req, res) {
        
        try {
            const {
                paymentCode,
                status
            } = req.body;

            await PaymentWebhookService.execute(
                paymentCode,
                status
            );

            return res.status(200).json({
                message: 'Webhook processed successfully'
            });

        } catch (error) {

            return res.status(400).json({
                error: error.message
            });

        }
    }
}

export default new PaymentWebhookController();