import SaleService from "../services/sale.service.js";

class SaleController {
    async getAllSales(req, res) {
        try {
            const sales = await SaleService.getAllSales();
            res.status(200).json(sales);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async createSale(req, res) {
        req.body;
        const data = {
            vehicleId: req.body.vehicleId,
            buyerCpf: req.body.cpf,
        }

        try {
            const sale = await SaleService.createSale(data);
        res.status(201).json(sale);
        } catch (error) {
        res.status(400).json({ error: error.message });
        }
    }
}

export default new SaleController();

