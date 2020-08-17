import BaseController from './BaseController';

import {
  totalSlotsSchema,
  parkingSchema,
  unparkSchema,
  typeSchema,
  plateNoSchema,
} from 'helpers/validations';

class ParkingController extends BaseController {
  async getTotalSlots() {
    try {
      const response = await this.repository.parking.getTotalSlots(this.redis);

      this.ok(response);
    } catch (err) {
      this.error(err);
    }
  }

  async setTotalSlots() {
    try {
      const { totalSlots } = this.body;

      await totalSlotsSchema.validateAsync(this.body);

      const response = await this.repository.parking.updateSlots(totalSlots, this.redis);

      this.ok(response);
    } catch (err) {
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async getAvailablefreeSlots() {
    try {
      const response = await this.repository.parking.getAvailablefreeSlots(this.redis);

      this.ok(response);
    } catch (err) {
      this.error(err);
    }
  }

  async parkCar() {
    try {
      await parkingSchema.validateAsync(this.body);

      const response = await this.repository.parking.parkCar(this.body, this.redis);

      this.ok(response);
    } catch (err) {
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async unparkCar() {
    try {
      const { slotId } = this.params;
      await unparkSchema.validateAsync(this.params);

      const response = await this.repository.parking.unparkCar(slotId, this.redis);

      this.ok(response);
    } catch (err) {
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async getCarsByType() {
    try {
      const { type } = this.query;

      await typeSchema.validateAsync(this.query);

      const response = await this.repository.parking.getAllByType(type, 'type');

      this.ok(response);
    } catch (err) {
      console.log(err);
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async getCarByNo() {
    try {
      const { plateNo } = this.query;
      await plateNoSchema.validateAsync(this.query);
      const response = await this.repository.parking.getAllByType(plateNo, 'plateNo');
      this.ok(response);
    } catch (err) {
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }
}

export default ParkingController;
