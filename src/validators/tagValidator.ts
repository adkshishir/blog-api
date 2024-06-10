import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import response from '../helpers/formateResponse';

const validateCreateTag = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    categoryId: Joi.number().required(),
    name: Joi.string(),
    slug: Joi.string(),
    description: Joi.string(),
    seo: {
      metaTitle: Joi.string(),
      metaDescription: Joi.string(),
      metaKeywords: Joi.string(),
      canonical: Joi.string(),
      ogTitle: Joi.string(),
      ogDescription: Joi.string(),
      ogImage: Joi.string(),
      twitterTitle: Joi.string(),
      twitterDescription: Joi.string(),
      twitterImage: Joi.string(),
    },
    alt: Joi.string(),
    image: File || undefined,
  });

  const { error } = schema.validate(req.body);
  if (error) {
    throw {
      status: 400,
      message: error.details[0].message,
    };
  }
};

export default { validateCreateTag };
