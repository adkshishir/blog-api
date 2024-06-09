import { NextFunction, Request, Response } from 'express';
import { userType } from '../types';
import jwt from 'jsonwebtoken';
import prisma from '../services/prisma';

class roleMiddleware {
  public async checkAdmin(req: Request, res: Response, next: NextFunction) {
    // get the token from the header
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({
        message: 'No token, authorization denied',
      });
    }

    try {
      // verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as userType;

      // get the user from the token
      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
        select: {
          roles: true,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: 'No user found',
        });
      }
      // check if the user has admin role
      const isAdmin = user.roles.some((role) => role.name === 'admin');
      if (!isAdmin) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
  }

  public async checkUser(req: Request, res: Response, next: NextFunction) {
    // get the token from the header
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({
        message: 'No token, authorization denied',
      });
    }
    try {
      // verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as userType;
      // get the user from the token
      const user = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
        select: {
          roles: true,
        },
      });
      if (!user) {
        return res.status(401).json({
          message: 'No user found',
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }
    next();
  }
}

export default new roleMiddleware();