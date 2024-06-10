
import { Router } from "express";
import tagsController from "../controllers/tagsController";
const router = Router();
router.get('/tags', tagsController.index);
router.get('/tags/:id', tagsController.show);
router.get('/tags/slug/:slug', tagsController.showBySlug);
router.post('/tags', tagsController.create);
router.patch('/tags/:id', tagsController.update);
router.delete('/tags/:id', tagsController.delete);
const tagRoutes = router;
export default tagRoutes