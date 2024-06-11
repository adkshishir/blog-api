import { Router } from 'express';
const router = Router();
import postController from '../controllers/postsController';
import postValidator from '../validators/postValidator';
import userMiddleware from '../middleware/userMiddleware';
import { upload } from '../libs/multer/uploadImage';

router.get('/posts', postController.index);
router.get('/posts/:id', postController.show);
router.get('/posts/slug/:slug', postController.showBySlug);
router.post(
  '/posts',
  userMiddleware.checkAdmin,
  upload.none(),
  postController.create
);
router.patch('/posts/:id', userMiddleware.checkAdmin, postController.update);
router.delete('/posts/:id', userMiddleware.checkAdmin, postController.delete);
const postRoutes = router;
export default postRoutes;
