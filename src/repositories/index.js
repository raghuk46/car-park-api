import UserRepository from './UserRepository';
import ParkingRepository from './ParkingRepository';

class Repository {
  constructor(db) {
    this.db = db;
  }

  registerRepositories(logger) {
    this.user = new UserRepository(this.db, logger);
    this.parking = new ParkingRepository(this.db, logger);
  }
}

export default Repository;
