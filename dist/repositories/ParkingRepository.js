"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _BaseRepository2 = _interopRequireDefault(require("./BaseRepository"));

var _slotFinder = _interopRequireDefault(require("../helpers/slotFinder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

let ParkingRepository = /*#__PURE__*/function (_BaseRepository) {
  _inherits(ParkingRepository, _BaseRepository);

  var _super = _createSuper(ParkingRepository);

  function ParkingRepository(db, logger) {
    var _this;

    _classCallCheck(this, ParkingRepository);

    _this = _super.call(this);
    _this.logger = logger;
    _this.db = db;
    _this.statsCollection = db.collection('parkingStats').doc('stats');
    _this.parkingCollection = db.collection('parkinglot');
    return _this;
  }

  _createClass(ParkingRepository, [{
    key: "getTotalSlots",
    value: async function getTotalSlots(redis) {
      try {
        const snapshot = await this.statsCollection.get();
        const {
          totalSlots
        } = snapshot.data();
        redis.set('totalSlots', totalSlots);
        return {
          status: 'success',
          totalSlots
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "updateSlots",
    value: async function updateSlots(slots, redis) {
      try {
        await this.statsCollection.set({
          totalSlots: slots
        }, {
          merge: true
        });
        redis.set('totalSlots', slots);
        return {
          status: 'success',
          totalSlots: slots,
          statusCode: 200,
          message: 'Slots Updated Successfully'
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "getAvailablefreeSlots",
    value: async function getAvailablefreeSlots(redis, updatedSlots = null) {
      try {
        if (updatedSlots !== null) {
          await this.statsCollection.set({
            freeSlots: updatedSlots,
            updatedAt: _firebaseAdmin.default.firestore.FieldValue.serverTimestamp()
          }, {
            merge: true
          });
        }

        const snapshot = await this.statsCollection.get();
        const {
          freeSlots
        } = snapshot.data();
        redis.set('freeSlots', freeSlots);
        return {
          status: 'success',
          freeSlots
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "parkCar",
    value: async function parkCar(data, redis) {
      try {
        const {
          plateNo,
          color,
          type
        } = data;
        const snapshot = await this.statsCollection.get();
        const {
          totalSlots,
          freeSlots
        } = snapshot.data();
        let occupiedSlots = [];

        if (freeSlots === 0) {
          return {
            status: 'success',
            message: 'Plarking Lot full'
          };
        }

        const activeSlots = await this.parkingCollection.where('active', '==', true).get();

        if (!activeSlots.empty) {
          for (const doc of activeSlots.docs) {
            occupiedSlots.push(doc.data().slot);
          }
        }

        const nearestAvalaibleSlot = (0, _slotFinder.default)({
          occupied: occupiedSlots,
          totalSlots
        }); // let`s add the car record and update the freeSlots

        await this.parkingCollection.add({
          plateNo: plateNo,
          color: color,
          type: type,
          slot: nearestAvalaibleSlot,
          enteredAt: _firebaseAdmin.default.firestore.FieldValue.serverTimestamp(),
          active: true
        }); // let`s update the freeSlots coun`t

        const totalOccupied = occupiedSlots.length + 1;
        const avaialbeSlots = totalSlots - totalOccupied; // let`s reuse the above method to update the stats

        this.getAvailablefreeSlots(redis, avaialbeSlots);
        return {
          statusCode: 200,
          status: 'success',
          message: 'Please park in alloted slot',
          slot: nearestAvalaibleSlot
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "unparkCar",
    value: async function unparkCar(slot, redis) {
      try {
        const statsSnapshot = await this.statsCollection.get();
        const snapshot = await this.parkingCollection.where('slot', '==', parseInt(slot)).where('active', '==', true).limit(1).get();

        if (snapshot.empty) {
          return {
            status: 'success',
            message: 'inValid Slot Provided'
          };
        }

        for (const doc of snapshot.docs) {
          const {
            plateNo,
            color,
            type
          } = doc.data();
          await this.parkingCollection.doc(doc.id).set({
            active: false,
            exitedAt: _firebaseAdmin.default.firestore.FieldValue.serverTimestamp()
          }, {
            merge: true
          });
          const {
            freeSlots
          } = statsSnapshot.data();
          const avaialbeSlots = freeSlots + 1;
          this.getAvailablefreeSlots(redis, avaialbeSlots);
          return {
            status: 'success',
            message: 'unparking Successful',
            carInfo: {
              plateNo,
              color,
              type
            }
          };
        }
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "getAllByType",
    value: async function getAllByType(val, keyName) {
      try {
        const snapshot = await this.parkingCollection.where(`${keyName}`, '==', val).where('active', '==', true).get();

        if (snapshot.empty) {
          return {
            status: 'success',
            total: 0,
            message: 'No Records found'
          };
        }

        console.log();
        const total = snapshot.docs.length;
        const data = snapshot.docs.map(doc => {
          return _objectSpread({
            id: doc.id
          }, doc.data());
        });
        return {
          status: 'success',
          total,
          data
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }]);

  return ParkingRepository;
}(_BaseRepository2.default);

var _default = ParkingRepository;
exports.default = _default;
//# sourceMappingURL=ParkingRepository.js.map