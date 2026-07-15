import SaleService from "../services/sale.service.js";
import { validateCPF } from "../utils/document.validate.js";

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

        if (!req.body.vehicleId || !req.body.cpf) {
            return res.status(400).json({ error: 'vehicleId and cpf are required' });
        }

        /*
        * Para fins de facilitar os testes, a validação do CPF não está sendo feita pela formula matemática,
        * a validação está sendo feita por uma forma mais branda, verificando o tamanho,
        * e por lista de CPFs inválidos.
        */
        if (!validateCPF(req.body.cpf)) {
            return res.status(400).json({ error: 'Invalid CPF' });
        }

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
