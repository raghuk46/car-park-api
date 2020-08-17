import Joi from 'joi';

const registrationSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,15}$/)
      .required()
      .messages({
        'string.base': `username should contain`,
        'string.empty': `username cannot be an empty`,
        'string.pattern.base': `username must be atleast 3 char long`,
      }),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9@#]{8,16}$/)
      .messages({
        'string.empty': `password cannot be an empty`,
        'string.pattern.base': `password must be between 8-16 char long`,
      }),
    confirm_password: Joi.ref('password'),
  });

const authSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    username: Joi.string().required().messages({
      'string.empty': 'username cannot be an empty',
      'any.required': 'username is required',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'password cannot be an empty',
      'any.required': 'password is required',
    }),
  });

const totalSlotsSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    totalSlots: Joi.number().integer().min(1).required().messages({
      'number.base': `totalSlots must be a number`,
      'number.min': 'totlaSlots must be greater than or equal to 1',
    }),
  });

const parkingSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    plateNo: Joi.string()
      .regex(/^[a-zA-Z0-9 ]{5,8}$/)
      .required()
      .messages({
        'string.empty': `plate No cannot be an empty`,
        'string.pattern.base': `plate No must be in between 5-8 char long`,
      }),
    color: Joi.string().required().messages({
      'string.empty': `car color cannot be an empty`,
    }),
    type: Joi.string().required().messages({
      'string.empty': `car type cannot be an empty`,
    }),
  });

const unparkSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    slotId: Joi.number().integer().min(1).required().messages({
      'number.base': `slotId must be a number`,
      'number.min': 'slotId must be greater than or equal to 1',
    }),
  });

const typeSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    type: Joi.string().required().messages({
      'string.empty': `car type cannot be an empty`,
    }),
  });

const plateNoSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    plateNo: Joi.string()
      .regex(/^[a-zA-Z0-9 ]{5,8}$/)
      .required()
      .messages({
        'string.empty': `plate No cannot be an empty`,
        'string.pattern.base': `plate No must be in between 5-8 char long`,
      }),
  });

export {
  registrationSchema,
  authSchema,
  totalSlotsSchema,
  parkingSchema,
  unparkSchema,
  typeSchema,
  plateNoSchema,
};
