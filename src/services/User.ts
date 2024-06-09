import { NextFunction, Request, Response } from 'express';
import prisma from './prisma';
import { userType } from '../types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
class User {
  async register(userData: userType) {
    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          emailVerifiedAt: new Date(),
          password: await bcrypt.hash(userData.password, 10),
          roles: {
            create: {
              name: userData.role || undefined,
            },
          },
        },
      });
      return user;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'User already exists',
        };
      }
      throw { error: error };
    }
  }
  async login({ email, password }: { email: string; password: string }) {
    try {
      const availableUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!availableUser) {
        throw {
          status: 404,
          message: 'Invalid credentials',
        };
      }
      // check if the password is correct
      const isPasswordValid = await bcrypt.compare(
        password,
        availableUser.password as string
      );
      if (!isPasswordValid) {
        throw {
          status: 400,
          message: 'Invalid Password',
        };
      }
      // generate jsonwebtoken
      const token = jwt.sign(
        { id: availableUser.id, email },
        process.env.JWT_SECRET as string
      );
      return {
        token,
        user: {
          id: availableUser.id,
          name: availableUser.name,
          email: availableUser.email,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
export default new User();
