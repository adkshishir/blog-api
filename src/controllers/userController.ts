import { NextFunction, Request, Response } from 'express';
import User from '../services/User';
import { userType } from '../types';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: userType = req.body;
      const user = await User.register(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.login({ email, password });
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}

export default new UserController();
