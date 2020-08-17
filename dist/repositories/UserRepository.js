"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _BaseRepository2 = _interopRequireDefault(require("./BaseRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

let UserRepository = /*#__PURE__*/function (_BaseRepository) {
  _inherits(UserRepository, _BaseRepository);

  var _super = _createSuper(UserRepository);

  function UserRepository(db, logger) {
    var _this;

    _classCallCheck(this, UserRepository);

    _this = _super.call(this);
    _this.logger = logger;
    _this.db = db;
    _this.usersCollection = db.collection('users');
    return _this;
  }

  _createClass(UserRepository, [{
    key: "createUser",
    value: async function createUser(data) {
      try {
        const {
          username,
          password
        } = data;
        const userSnapshot = await this.usersCollection.where('username', '==', username).limit(1).get();

        if (!userSnapshot.empty) {
          return {
            statusCode: 200,
            message: 'User already Exists'
          };
        }

        const paswordHash = (0, _bcryptjs.hashSync)(password, 10);
        await this.usersCollection.add({
          username,
          password: paswordHash
        });
        return {
          statusCode: 201,
          message: 'User Created Successfully'
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "authenticate",
    value: async function authenticate(data) {
      try {
        const {
          username,
          password
        } = data;
        const userSnapshot = await this.usersCollection.where('username', '==', username).get();

        if (userSnapshot.empty) {
          return {
            statusCode: 200,
            message: 'User Not Found'
          };
        }

        for (const doc of userSnapshot.docs) {
          const comparePass = (0, _bcryptjs.compareSync)(password, doc.data().password);

          if (!comparePass) {
            return {
              statusCode: 200,
              message: 'username / password incorrect!'
            };
          }

          const token = _jsonwebtoken.default.sign({
            uuid: doc.id
          }, process.env.JWT_SECRET, {
            expiresIn: '1800s'
          });

          return {
            statusCode: 200,
            message: 'success',
            token
          };
        }
      } catch (err) {
        this.logger.error(err);
      }
    }
  }, {
    key: "getById",
    value: async function getById(userId) {
      try {
        const userSnapshot = await this.usersCollection.doc(userId).get();

        if (userSnapshot.empty) {
          return {
            status: 'error',
            message: 'user not found',
            userData: {}
          };
        }

        const {
          username
        } = userSnapshot.data();
        return {
          status: 'success',
          userData: {
            username
          }
        };
      } catch (err) {
        this.logger.error(err);
      }
    }
  }]);

  return UserRepository;
}(_BaseRepository2.default);

var _default = UserRepository;
exports.default = _default;
//# sourceMappingURL=UserRepository.js.map