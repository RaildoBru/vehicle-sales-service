import SaleRepository from '../repositories/sale.repository.js';
import VehicleServiceClient from '../clients/vehicle.service.client.js';
import SaleStatus from '../enums/sale-status.enum.js';

class PaymentWebhookService {

    async execute(paymentCode, status) {

        const sale = await SaleRepository.findByPaymentCode(paymentCode);

        if (!sale) {
            throw new Error('Sale not found');
        }

        const statusPayment = status.toLowerCase() === 'payment_approved' ? 
            SaleStatus.APPROVED : SaleStatus.REJECTED;

        await SaleRepository.updateStatus(
            sale._id,
            statusPayment
        );

        if (statusPayment === SaleStatus.APPROVED) {
            await VehicleServiceClient.markAsSold(
                sale.vehicleId
            );
            return;
        }

        await VehicleServiceClient.markAsAvailable(
            sale.vehicleId
        );
        return;
    }
}

export default new PaymentWebhookService();
