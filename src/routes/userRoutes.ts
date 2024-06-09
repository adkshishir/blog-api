import { Router } from 'express';
import userController from '../controllers/userController';
import userValidator from '../validators/userValidator';
const router = Router();
router.post(
  '/register',
  userValidator.validateRegister,
  userController.createUser
);
router.post('/login', userValidator.validateLogin, userController.loginUser);
const userRoutes = router;
export default userRoutes;
