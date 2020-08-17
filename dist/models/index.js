"use strict";

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serviceAccount = require("../secrets/serviceAccountKey.json");

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert(serviceAccount),
  databaseURL: 'https://car-park-store.firebaseio.com'
});

const db = _firebaseAdmin.default.firestore();

db.settings({
  timestampsInSnapshots: true
});
module.exports = db;
//# sourceMappingURL=index.js.map