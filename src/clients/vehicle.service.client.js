import axios from 'axios';

class VehicleServiceClient {

    async markAsSold(vehicleId) {
        await axios.patch(
            `${process.env.VEHICLE_SERVICE_URL}/vehicles/${vehicleId}/status`,
            { status: 'SOLD' }
        );
    }

    async markAsAvailable(vehicleId) {
        await axios.patch(
            `${process.env.VEHICLE_SERVICE_URL}/vehicles/${vehicleId}/status`,
            { status: 'AVAILABLE' }
        );
    }

    async markAsPendingPayment(vehicleId) {
        await axios.patch(
            `${process.env.VEHICLE_SERVICE_URL}/vehicles/${vehicleId}/status`,
            { status: 'PENDING_PAYMENT' }
        );
    }
}

export default new VehicleServiceClient();