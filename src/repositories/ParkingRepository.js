import firebase from 'firebase-admin';

import BaseRepository from 'repositories/BaseRepository';
import findNearestAvailable from '/helpers/slotFinder';

class ParkingRepository extends BaseRepository {
  constructor(db, logger) {
    super();
    this.logger = logger;
    this.db = db;
    this.statsCollection = db.collection('parkingStats').doc('stats');
    this.parkingCollection = db.collection('parkinglot');
  }

  async getTotalSlots(redis) {
    try {
      const snapshot = await this.statsCollection.get();
      const { totalSlots } = snapshot.data();
      redis.set('totalSlots', totalSlots);
      return { status: 'success', totalSlots };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async updateSlots(slots, redis) {
    try {
      await this.statsCollection.set(
        {
          totalSlots: slots,
        },
        { merge: true },
      );
      redis.set('totalSlots', slots);
      return {
        status: 'success',
        totalSlots: slots,
        statusCode: 200,
        message: 'Slots Updated Successfully',
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getAvailablefreeSlots(redis, updatedSlots = null) {
    try {
      if (updatedSlots !== null) {
        await this.statsCollection.set(
          { freeSlots: updatedSlots, updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
          { merge: true },
        );
      }

      const snapshot = await this.statsCollection.get();
      const { freeSlots } = snapshot.data();
      redis.set('freeSlots', freeSlots);
      return { status: 'success', freeSlots };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async parkCar(data, redis) {
    try {
      const { plateNo, color, type } = data;
      const snapshot = await this.statsCollection.get();
      const { totalSlots, freeSlots } = snapshot.data();
      let occupiedSlots = [];

      if (freeSlots === 0) {
        return { status: 'success', message: 'Plarking Lot full' };
      }

      const activeSlots = await this.parkingCollection.where('active', '==', true).get();

      if (!activeSlots.empty) {
        for (const doc of activeSlots.docs) {
          occupiedSlots.push(doc.data().slot);
        }
      }

      const nearestAvalaibleSlot = findNearestAvailable({ occupied: occupiedSlots, totalSlots });

      // let`s add the car record and update the freeSlots
      await this.parkingCollection.add({
        plateNo: plateNo,
        color: color,
        type: type,
        slot: nearestAvalaibleSlot,
        enteredAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true,
      });

      // let`s update the freeSlots coun`t
      const totalOccupied = occupiedSlots.length + 1;
      const avaialbeSlots = totalSlots - totalOccupied;

      // let`s reuse the above method to update the stats
      this.getAvailablefreeSlots(redis, avaialbeSlots);

      return {
        statusCode: 200,
        status: 'success',
        message: 'Please park in alloted slot',
        slot: nearestAvalaibleSlot,
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async unparkCar(slot, redis) {
    try {
      const statsSnapshot = await this.statsCollection.get();
      const snapshot = await this.parkingCollection
        .where('slot', '==', parseInt(slot))
        .where('active', '==', true)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return { status: 'success', message: 'inValid Slot Provided' };
      }

      for (const doc of snapshot.docs) {
        const { plateNo, color, type } = doc.data();
        await this.parkingCollection
          .doc(doc.id)
          .set(
            { active: false, exitedAt: firebase.firestore.FieldValue.serverTimestamp() },
            { merge: true },
          );
        const { freeSlots } = statsSnapshot.data();
        const avaialbeSlots = freeSlots + 1;
        this.getAvailablefreeSlots(redis, avaialbeSlots);
        return {
          status: 'success',
          message: 'unparking Successful',
          carInfo: { plateNo, color, type },
        };
      }
    } catch (err) {
      this.logger.error(err);
    }
  }

  async getAllByType(val, keyName) {
    try {
      const snapshot = await this.parkingCollection
        .where(`${keyName}`, '==', val)
        .where('active', '==', true)
        .get();

      if (snapshot.empty) {
        return { status: 'success', total: 0, message: 'No Records found' };
      }

      console.log();

      const total = snapshot.docs.length;
      const data = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return { status: 'success', total, data };
    } catch (err) {
      this.logger.error(err);
    }
  }
}

export default ParkingRepository;
