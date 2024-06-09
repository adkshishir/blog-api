import { NextFunction, Request, Response } from 'express';
import { userType } from '../types';
import jwt from 'jsonwebtoken';
import prisma from '../services/prisma';
import response from '../helpers/formateResponse';

async function checkAdmin(req: Request, res: Response, next: NextFunction) {
  // get the token from the header
  const authToken = req.header('Authorization');
  const token = authToken && authToken.split(' ')[1];

  if (!token) {
    return res.status(401).json(response(401, 'Token not found'));
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      email: string;
    };

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
      return res.status(401).json(response(401, 'User not found'));
    }
    // check if the user has admin role
    const isAdmin = user.roles.some((role) => role.name === 'admin');
    if (!isAdmin) {
      return res.status(401).json(response(401, 'Not authorized'));
    }
    next();
  } catch (error) {
    return res.status(401).json(response(401, 'Invalid token'));
  }
}

async function checkUser(req: Request, res: Response, next: NextFunction) {
  // get the token from the header
  const authToken = req.header('Authorization');
  const token = authToken && authToken.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json(response(401, 'No token, authorization denied'));
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
      return res.status(401).json(response(401, 'User not found'));
    }
  } catch (error) {
    return res.status(401).json(response(401, 'Invalid token'));
  }
  next();
}

export default {
  checkAdmin,
  checkUser,
};
