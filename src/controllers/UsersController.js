import BaseController from './BaseController';
import { registrationSchema, authSchema } from 'helpers/validations';

class UsersController extends BaseController {
  async register() {
    try {
      await registrationSchema.validateAsync(this.body);

      const response = await this.repository.user.createUser(this.body);

      response.statusCode === 201 ? this.created('', response) : this.ok(response);
    } catch (err) {
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async authenticate() {
    try {
      await authSchema.validateAsync(this.body);
      const response = await this.repository.user.authenticate(this.body);

      this.ok(response);
    } catch (err) {
      console.log(err);
      this.errorResponse(422, 'Unprocessible Entity', err.details);
    }
  }

  async getUserInfo() {
    try {
      const response = await this.repository.user.getById(this.req.userId);
      this.ok(response);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

export default UsersController;
