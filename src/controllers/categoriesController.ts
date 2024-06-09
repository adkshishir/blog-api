import { NextFunction, Request, Response } from 'express';
import Category from '../services/Category';
import response from '../helpers/formateResponse';

class categoryController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await Category.getCategories();
      console.log(categories, 'categories in the controller');
      res.status(200).json(response(200, 'All Categories', categories));
    } catch (error: any) {
      res.status(404).json(response(404, 'No categories found'));
    }
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // get image from request
      const image = req.file;

      const category = await Category.createCategory({
        ...req.body,
        image: {
          url: image?.filename,
          alt: req.body.alt,
        },
      });
      console.log(req.body);
      res
        .status(201)
        .json(response(201, 'Category created successfully', category));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const image = req.file;
      const category = await Category.updateCategory(Number(req.params.id), {
        ...req.body,
        image: {
          url: image?.filename,
          alt: req.body.alt,
        },
      });
      res
        .status(200)
        .json(response(200, 'Category updated successfully', category));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.getCategory(Number(req.params.id));
      res
        .status(200)
        .json(response(200, 'Category found successfully', category));
    } catch (error: any) {
      res.status(404).json(response(404, 'Category not found'));
    }
  }
  // get category by slug
  async showBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.getCategoryBySlug(req.params.slug);
      res
        .status(200)
        .json(response(200, 'Category found successfully', category));
    } catch (error: any) {
      res.status(404).json(response(404, 'Category not found'));
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await Category.deleteCategory(Number(req.params.id));
      res
        .status(200)
        .json(response(200, 'Category deleted successfully', category));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
}

export default new categoryController();
