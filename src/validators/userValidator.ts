import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.message, error: error.details });
  } else {
    next();
  }
};
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
     console.log(req.body)
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.message, error: error.details });
  } else {
    next();
  }
};
export default {
  validateRegister,
  validateLogin,
};
