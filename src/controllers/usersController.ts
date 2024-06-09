import { NextFunction, Request, Response } from 'express';
import User from '../services/User';
import { userType } from '../types';
import response from '../helpers/formateResponse';

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: userType = req.body;
      const user = await User.register(userData);
      return res
        .status(201)
        .json(response(201, 'User created successfully', user));
    } catch (error) {
      return res.status(400).json(response(400, 'User already exists'));
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.login({ email, password });
      res.status(200).json(response(200, 'User logged in successfully', user));
    } catch (error: any) {
      if (error.status === 404) {
        return res.status(404).json(response(404, 'User not found'));
      }
      return res.status(400).json(response(400, error.message));
    }
  }
}

export default new UserController();
