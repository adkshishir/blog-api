import { Router } from 'express';
import tagsController from '../controllers/tagsController';
import userMiddleware from '../middleware/userMiddleware';
import { upload } from '../libs/multer/uploadImage';
import tagValidator from '../validators/tagValidator';
const router = Router();
router.get('/tags', tagsController.index);
router.get('/tags/:id', tagsController.show);
router.get('/tags/slug/:slug', tagsController.showBySlug);
router.post(
  '/tags',
  userMiddleware.checkAdmin,
  upload.single('image'),
  tagsController.create
);
router.patch(
  '/tags/:id',
  userMiddleware.checkAdmin,
  upload.single('image'),
  tagsController.update
);
router.delete('/tags/:id', userMiddleware.checkAdmin, tagsController.delete);
const tagRoutes = router;
export default tagRoutes;
