import { SafeUser } from '../../types';

export interface IUserService {
    createUser(data: { name: string; email: string; password: string; role: 'ADMIN'|'MOBILE_USER' }): Promise<SafeUser>;
  getAllUsers(): Promise<SafeUser[]>;
  getUserById(id: number): Promise<SafeUser>;
  updateUser(id: number, data: Partial<SafeUser>): Promise<SafeUser>;
  deleteUser(id: number): Promise<void>;
}
