import { NextFunction, Request, Response } from 'express';
import response from '../helpers/formateResponse';
import tag from '../services/tag';

class tagsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await tag.getAllTags();
      res.status(200).json(response(200, 'Tags fetched successfully', tags));
    } catch (error: any) {
      res.status(404).json(response(404, 'Tags not found'));
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const tagById = await tag.getTag(Number(req.params.id));
      res.status(200).json(response(200, 'Tag found successfully', tagById));
    } catch (error: any) {
      res.status(404).json(response(404, 'Tag not found'));
    }
  }
  async showBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const tagBySlug = await tag.getTagsBySlug(req.params.slug);
      res.status(200).json(response(200, 'Tag found successfully', tagBySlug));
    } catch (error: any) {
      res.status(404).json(response(404, 'Tag not found'));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createdTag = await tag.createTag(req.body);
      res
        .status(201)
        .json(response(201, 'Tag created successfully', createdTag));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updatedTag = await tag.updateTag(Number(req.params.id), req.body);
      res
        .status(200)
        .json(response(200, 'Tag updated successfully', updatedTag));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedTag = await tag.deleteTag(Number(req.params.id));
      res
        .status(200)
        .json(response(200, 'Tag deleted successfully', deletedTag));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
}

export default new tagsController();