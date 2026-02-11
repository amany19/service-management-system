import { UserType, SafeUser } from '../../types';

export interface IUserRepository {
    
  findAll(): Promise<SafeUser[]>;
  findById(id: number): Promise<SafeUser | null>;
  create(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MOBILE_USER';
  }): Promise<SafeUser>;
  update(id: number, data: Partial<UserType>): Promise<SafeUser>;
  delete(id: number): Promise<void>;
}
