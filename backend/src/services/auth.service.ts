import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthRepository } from '../repositories/persistence';
import { RegisterDTO, LoginDTO, UserType } from '../types';
import { IAuthService } from './interfaces';
import { AppError } from '../errors/AppError';
import { Role } from '@prisma/client';

export class AuthService implements IAuthService {
  constructor(private authRepository: IAuthRepository) {}

  async register(data: RegisterDTO) {
    const existingUser = await this.authRepository.findByEmail(data.email);

    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.authRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ? (data.role as Role) : Role.MOBILE_USER,
    });

    return this.generateToken(user);
  }

  async login(data: LoginDTO) {
    const user = await this.authRepository.findByEmail(data.email);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new AppError('Invalid credentials', 401);
    }

    return this.generateToken(user);
  }

  private generateToken(user: UserType) {
    return jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );
  }
}
