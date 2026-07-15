import Sale from '../models/sale.model.js';

class SaleRepository {
    async getAllSales() {
        try {
            const sales = await Sale.find();
            return sales;
        } catch (error) {
            throw new Error(`Failed to get all sales: ${error.message}`);
        }
    }
    async createSale(data) {
        try {
        
            const sale = await Sale.create({
                ...data
            });
            return sale;
        } catch (error) {
            throw new Error(`Failed to create sale: ${error.message}`);
        }
    }

    async findByPaymentCode(paymentCode) {
        try {
            const sale = await Sale.findOne({ paymentCode });
            return sale;
        } catch (error) {
            throw new Error(`Failed to find sale by payment code: ${error.message}`);
        }
    }

    async updateStatus(saleId, status) {
        try {
            const sale = await Sale.findByIdAndUpdate(
                saleId,
                { status },
                { new: true }
            );
            return sale;
        } catch (error) {
            throw new Error(`Failed to update sale status: ${error.message}`);
        }
    }
}

export default new SaleRepository();
