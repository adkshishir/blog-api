import { NextFunction, Request, Response } from 'express';
import Category from '../services/Category';
import response from '../helpers/formateResponse';

class categoryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = Category.getCategories();
      res.status(200).json(response(200, 'All Categories', categories));
    } catch (error: any) {
      res.status(404).json(response(404, 'No categories found'));
    }
  }
}

export default new categoryController()