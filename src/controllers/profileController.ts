import { NextFunction, Request, Response } from 'express';
import profile from '../services/profile';
import response from '../helpers/formateResponse';
import * as jwt from 'jsonwebtoken';
import findAuthorizedUser from '../helpers/findAuthorizedUser';
class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // get the user from the tokenschema

      const decoded = findAuthorizedUser(req);
      const ownerProfile = await profile.getProfile(Number(decoded?.id));
      res
        .status(200)
        .json(response(200, 'Profile found successfully', ownerProfile || {}));
    } catch (error: any) {
      res.status(404).json(response(404, 'Profile not found'));
    }
  }
  async deleteProfile(req: Request, res: Response, next: NextFunction) {
    try {
      // get the user from the token
      const decoded = findAuthorizedUser(req);
      const deletedProfile = await profile.deleteProfile(Number(decoded?.id));
      res
        .status(200)
        .json(response(200, 'Profile deleted successfully', deletedProfile));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async createProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = findAuthorizedUser(req);
      const createdProfile = await profile.createProfile({
        ...req.body,
        userId: Number(decoded?.id),
      });
      res
        .status(201)
        .json(response(201, 'Profile created successfully', createdProfile));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = findAuthorizedUser(req);
      const updatedProfile = await profile.updateProfile({
        ...req.body,
        userId: Number(decoded?.id),
      });
      res
        .status(200)
        .json(response(200, 'Profile updated successfully', updatedProfile));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async createProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const createdProgress = await profile.addProgress(req.body);
      res
        .status(201)
        .json(response(201, 'Progress created successfully', createdProgress));
    } catch (error: any) {
      res.status(400).json(response(400, error.message));
    }
  }
  async getProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await profile.getLatestProgress();
      res
        .status(200)
        .json(response(200, 'Progress found successfully', progress));
    } catch (error: any) {
      res.status(404).json(response(404, 'Progress not found'));
    }
  }
}

export default new ProfileController();
