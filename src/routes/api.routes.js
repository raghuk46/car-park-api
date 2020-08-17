import BaseRoutes from 'routes/base.routes';
import UsersController from 'controllers/UsersController';
import ParkingController from 'controllers/ParkingController';

class ApiRoutes extends BaseRoutes {
  // TO Register Routes this is pattern
  /**
   * 1. endpoint url decleration
   * 2. method associated like (GET, PUT, POST, DELETE, PATCH)
   * 3. controller name
   * 4. method you want to expose from the specific contoller.
   */
  getRoutes() {
    /* campaigns */
    this.addRoute('/register', 'post', UsersController, 'register');
    this.addRoute('/login', 'post', UsersController, 'authenticate');
    return this.routes;
  }

  // Secured router list those required jWT Token Authorization.
  getSecuredRoutes() {
    this.addRoute('/userInfo', 'get', UsersController, 'getUserInfo');
    this.addRoute('/slots', 'get', ParkingController, 'getTotalSlots', 'totalSlots');
    this.addRoute('/updateSlots', 'post', ParkingController, 'setTotalSlots');
    this.addRoute('/getFreeSlots', 'get', ParkingController, 'getAvailablefreeSlots', 'freeSlots');
    this.addRoute('/parkCar', 'post', ParkingController, 'parkCar');
    this.addRoute('/unparkCar/:slotId', 'get', ParkingController, 'unparkCar');
    this.addRoute('/getCarsByType', 'get', ParkingController, 'getCarsByType');
    this.addRoute('/getCarByNo', 'get', ParkingController, 'getCarByNo');
    return this.routes;
  }
}

export default ApiRoutes;
