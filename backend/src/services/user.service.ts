import { IUserService } from './interfaces';
import { IAuthRepository, IUserRepository } from '../repositories/persistence';
import { SafeUser, UserType } from '../types';
import bcrypt from 'bcryptjs';
import { AppError } from '../errors/AppError';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MOBILE_USER';
}

export class UserService implements IUserService {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async createUser({
    name,
    email,
    password,
    role,
  }: CreateUserDTO): Promise<SafeUser> {
    const existing = await this.authRepository.findByEmail(email);

    if (existing) {
      throw new AppError('Email already exists', 409);
    }

    const hashed = await bcrypt.hash(password, 10);

    return this.userRepository.create({
      name,
      email,
      password: hashed,
      role,
    });
  }

  async getAllUsers(): Promise<SafeUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<SafeUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async updateUser(
    id: number,
    data: Partial<UserType>
  ): Promise<SafeUser> {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new AppError('User not found', 404);
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    const existing = await this.userRepository.findById(id);

    if (!existing) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);
  }
}
