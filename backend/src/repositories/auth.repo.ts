import { PrismaClient } from '@prisma/client';
import { IAuthRepository } from './persistence';
import { UserType } from '../types';

const prisma = new PrismaClient();

export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<UserType | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name:user.name,
      email: user.email,
      password: user.password,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    };
  }

  async createUser(data: {
    name:string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MOBILE_USER';
  }): Promise<UserType> {
    const user = await prisma.user.create({ data });

    return {
      id: user.id,
      name:user.name,
      email: user.email,
      password: user.password,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    };
  }
}
