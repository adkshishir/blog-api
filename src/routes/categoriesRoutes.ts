import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';
import { upload } from '../libs/multer/uploadImage';
import { validateCreateCategory } from '../validators/categoryValidator';
import userMiddleware from '../middleware/userMiddleware';
const router = Router();
router.get('/categories', categoriesController.index);
router.post(
  '/categories',
  userMiddleware.checkAdmin,
  validateCreateCategory,
  upload.single('image'),
  categoriesController.create
);
router.get('/categories/slug/:slug', categoriesController.showBySlug);
router.get('/categories/:id', categoriesController.show);
router.delete(
  '/categories/:id',
  userMiddleware.checkAdmin,
  categoriesController.delete
);
router.patch(
  '/categories/:id',
  userMiddleware.checkAdmin,
  upload.single('image'),
  categoriesController.update
);

const categoryRoutes = router;
export default categoryRoutes;
