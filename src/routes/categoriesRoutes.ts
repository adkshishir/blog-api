import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';
import { uploadImage } from '../libs/multer/uploadImage';
import { validateCreateCategory } from '../validators/categoryValidator';
import userMiddleware from '../middleware/userMiddleware';
const router = Router();
router.get('/categories', categoriesController.index);
router.post(
  '/categories',
  userMiddleware.checkAdmin,
  validateCreateCategory,
  uploadImage,
  categoriesController.create
);
router.get('/categories/:slug', categoriesController.showBySlug);
router.get('/categories/id/:id', categoriesController.show);
router.delete(
  '/categories/:id',
  userMiddleware.checkAdmin,
  categoriesController.delete
);
router.patch(
  '/categories/:id',
  userMiddleware.checkAdmin,
  uploadImage,
  categoriesController.update
);

const categoryRoutes = router;
export default categoryRoutes;
