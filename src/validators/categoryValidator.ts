import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

// create category
export const validateCreateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   const schema = Joi.object({
  //     slug: Joi.string().required(),
  //   });
  //   const { error } = schema.validate(req.body);
  //   if (error) {
  //     return res.status(400).json({ message: error.details[0].message });
  //   }
  next();
};
