import { hashSync, compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import BaseRepository from 'repositories/BaseRepository';

class UserRepository extends BaseRepository {
  constructor(db, logger) {
    super();
    this.logger = logger;
    this.db = db;
    this.usersCollection = db.collection('users');
  }

  async createUser(data) {
    try {
      const { username, password } = data;

      const userSnapshot = await this.usersCollection
        .where('username', '==', username)
        .limit(1)
        .get();

      if (!userSnapshot.empty) {
        return { statusCode: 200, message: 'User already Exists' };
      }

      const paswordHash = hashSync(password, 10);
      await this.usersCollection.add({ username, password: paswordHash });
      return { statusCode: 201, message: 'User Created Successfully' };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async authenticate(data) {
    try {
      const { username, password } = data;
      const userSnapshot = await this.usersCollection.where('username', '==', username).get();

      if (userSnapshot.empty) {
        return { statusCode: 200, message: 'User Not Found' };
      }

      for (const doc of userSnapshot.docs) {
        const comparePass = compareSync(password, doc.data().password);
        if (!comparePass) {
          return { statusCode: 200, message: 'username / password incorrect!' };
        }

        const token = jwt.sign({ uuid: doc.id }, process.env.JWT_SECRET, { expiresIn: '1800s' });
        return { statusCode: 200, message: 'success', token };
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getById(userId) {
    try {
      const userSnapshot = await this.usersCollection.doc(userId).get();

      if (userSnapshot.empty) {
        return { status: 'error', message: 'user not found', userData: {} };
      }

      const { username } = userSnapshot.data();

      return { status: 'success', userData: { username } };
    } catch (err) {
      this.logger.error(err);
    }
  }
}

export default UserRepository;
