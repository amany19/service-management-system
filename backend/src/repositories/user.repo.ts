import { PrismaClient } from '@prisma/client';
import { IUserRepository } from './persistence';
import { SafeUser } from '../types';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  async findAll(): Promise<SafeUser[]> {
    const users = await prisma.user.findMany();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    }));
  }

  async findById(id: number): Promise<SafeUser | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    };
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MOBILE_USER';
  }): Promise<SafeUser> {
    const user = await prisma.user.create({ data });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    };
  }

  async update(id: number, data: any): Promise<SafeUser> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as 'ADMIN' | 'MOBILE_USER',
    };
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
