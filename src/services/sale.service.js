import SaleRepository from "../repositories/sale.repository.js";
import SaleStatus from "../enums/sale-status.enum.js";
import VehicleServiceClient from "../clients/vehicle.service.client.js";
import { generatePaymentCode } from '../utils/generate.paymentCode.js';


class SaleService {
    async getAllSales() {
        try {
            const sales = await SaleRepository.getAllSales();
            return sales;
        } catch (error) {
            throw new Error(`Failed to get all sales: ${error.message}`);
        }
    }
    async createSale(data) {
        const paymentCode = generatePaymentCode();
        const saleData = data;
        saleData.paymentCode = paymentCode;
        try {
            const sale = await SaleRepository.createSale(saleData);
            await VehicleServiceClient.markAsPendingPayment(sale.vehicleId);
            return sale;
        } catch (error) {
            throw new Error(`Failed to create sale: ${error.message}`);
        }
    }
}

export default new SaleService();
