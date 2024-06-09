import { Router } from 'express';
import categoriesController from '../controllers/categoriesController';
const router = Router();
router.get('/categories', categoriesController.index);

const categoryRoutes = router;
export default categoryRoutes;
