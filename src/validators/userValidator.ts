import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import response from '../helpers/formateResponse';

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(response(400, error.message, error.details));
  } else {
    next();
  }
};
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(response(400, error.message, error.details));
  } else {
    next();
  }
};
export default {
  validateRegister,
  validateLogin,
};
