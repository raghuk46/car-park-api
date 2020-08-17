"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plateNoSchema = exports.typeSchema = exports.unparkSchema = exports.parkingSchema = exports.totalSlotsSchema = exports.authSchema = exports.registrationSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registrationSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  username: _joi.default.string().regex(/^[a-zA-Z0-9]{3,15}$/).required().messages({
    'string.base': `username should contain`,
    'string.empty': `username cannot be an empty`,
    'string.pattern.base': `username must be atleast 3 char long`
  }),
  password: _joi.default.string().required().regex(/^[a-zA-Z0-9@#]{8,16}$/).messages({
    'string.empty': `password cannot be an empty`,
    'string.pattern.base': `password must be between 8-16 char long`
  }),
  confirm_password: _joi.default.ref('password')
});

exports.registrationSchema = registrationSchema;

const authSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  username: _joi.default.string().required().messages({
    'string.empty': 'username cannot be an empty',
    'any.required': 'username is required'
  }),
  password: _joi.default.string().required().messages({
    'string.empty': 'password cannot be an empty',
    'any.required': 'password is required'
  })
});

exports.authSchema = authSchema;

const totalSlotsSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  totalSlots: _joi.default.number().integer().min(1).required().messages({
    'number.base': `totalSlots must be a number`,
    'number.min': 'totlaSlots must be greater than or equal to 1'
  })
});

exports.totalSlotsSchema = totalSlotsSchema;

const parkingSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  plateNo: _joi.default.string().regex(/^[a-zA-Z0-9 ]{5,8}$/).required().messages({
    'string.empty': `plate No cannot be an empty`,
    'string.pattern.base': `plate No must be in between 5-8 char long`
  }),
  color: _joi.default.string().required().messages({
    'string.empty': `car color cannot be an empty`
  }),
  type: _joi.default.string().required().messages({
    'string.empty': `car type cannot be an empty`
  })
});

exports.parkingSchema = parkingSchema;

const unparkSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  slotId: _joi.default.number().integer().min(1).required().messages({
    'number.base': `slotId must be a number`,
    'number.min': 'slotId must be greater than or equal to 1'
  })
});

exports.unparkSchema = unparkSchema;

const typeSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  type: _joi.default.string().required().messages({
    'string.empty': `car type cannot be an empty`
  })
});

exports.typeSchema = typeSchema;

const plateNoSchema = _joi.default.object().options({
  abortEarly: false
}).keys({
  plateNo: _joi.default.string().regex(/^[a-zA-Z0-9 ]{5,8}$/).required().messages({
    'string.empty': `plate No cannot be an empty`,
    'string.pattern.base': `plate No must be in between 5-8 char long`
  })
});

exports.plateNoSchema = plateNoSchema;
//# sourceMappingURL=validations.js.map