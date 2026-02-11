import { UserType } from '../../types';

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserType | null>;
  createUser(data: {
    name:string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MOBILE_USER';
  }): Promise<UserType>;
}
