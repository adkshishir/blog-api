import { NextFunction, Request, Response } from 'express';
import post from '../services/post';
import response from '../helpers/formateResponse';
import findAuthorizedUser from '../helpers/findAuthorizedUser';
import { postType } from '../types';

class postController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await post.getAllPosts();
      res.status(200).json(response(200, 'Posts fetched successfully', posts));
    } catch (error: any) {
      res.status(404).json(response(404, 'Posts not found'));
    }
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const postById = await post.getPost(Number(req.params.id));
      res.status(200).json(response(200, 'Post found successfully', postById));
    } catch (error: any) {
      res.status(404).json(response(404, 'Post not found'));
    }
  }

  async showBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const postBySlug = await post.getPostBySlug(req.params.slug);
      res
        .status(200)
        .json(response(200, 'Post found successfully', postBySlug));
    } catch (error: any) {
      res.status(404).json(response(404, 'Post not found'));
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // get user id from token
      const decoded = findAuthorizedUser(req);
      const files: any = req.files;
      const images = files.images.map((image: any, index: number) => {
        return { url: image.filename, alt: req.body.imagesAlt[index] };
      });
      const specialSectionImages = files.specialSectionImages.map(
        (image: any, index: number) => {
          return {
            url: image.filename,
            alt: req.body.specialSectionImagesAlt[index],
          };
        }
      );
      const postInput: postType = req.body;
      const createdPost = await post.createPost({
        ...postInput,
        images: images,
        specialSectionImages: specialSectionImages,
        userId: Number(decoded?.id),
      });
      res
        .status(200)
        .json(response(200, 'Post created successfully', createdPost));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      // get user id from token
      const decoded = findAuthorizedUser(req);
      const postInput: postType = req.body;
      const updatedPost = await post.updatePost(Number(req.params.id), {
        ...postInput,
        image: { url: req.file?.filename, alt: req.body.alt },
        userId: Number(decoded?.id),
      });
      res
        .status(200)
        .json(response(200, 'Post updated successfully', updatedPost));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedPost = await post.deletePost(Number(req.params.id));
      res
        .status(200)
        .json(response(200, 'Post deleted successfully', deletedPost));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
}
export default new postController();
