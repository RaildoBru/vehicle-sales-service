import mongoose from 'mongoose';
import SaleStatus from '../enums/sale-status.enum.js';

const saleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true
    },
    buyerCpf: {
      type: String,
      required: true
    },
    paymentCode: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(SaleStatus),
      default: SaleStatus.PENDING
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Sale', saleSchema);