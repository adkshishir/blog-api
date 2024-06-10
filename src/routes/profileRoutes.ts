import { Router } from 'express';
import profileController from '../controllers/profileController';
import userMiddleware from '../middleware/userMiddleware';
const router = Router();

router.get('/profile', userMiddleware.checkAdmin, profileController.getProfile);
router.post('/profile', profileController.createProfile);
router.patch(
  '/profile',
  userMiddleware.checkAdmin,
  profileController.updateProfile
);
router.get(
  '/profile/progress',
  userMiddleware.checkAdmin,
  profileController.getProgress
);
router.delete(
  '/profile',
  userMiddleware.checkAdmin,
  profileController.deleteProfile
);
router.post(
  '/profile/progress',
  userMiddleware.checkAdmin,
  profileController.createProgress
);
const profileRoutes = router;
export default profileRoutes;
