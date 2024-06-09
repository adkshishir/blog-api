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
              name: userData.role||null,
            },
          },
        },
      });
      return {
        status: 201,
        message: 'User created successfully',
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw {
          status: 400,
          message: 'User already exists',
        };
      }
      throw error;
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
          message: 'User not found',
        };
      }
      // check if the password is correct
      const isPasswordValid = bcrypt.compare(
        password,
        availableUser.password as string
      );

      if (!isPasswordValid) {
        throw {
          status: 400,
          message: 'Invalid password',
        };
      }
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user || user.password !== password) {
        throw {
          status: 400,
          message: 'Invalid credentials',
        };
      }
      // generate jsonwebtoken
      const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_SECRET as string
      );
      console.log(token);
      return {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
export default new User();
