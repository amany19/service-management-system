export interface UserType{
  id: number;
  name:string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MOBILE_USER';
}
export type SafeUser = Omit<UserType, 'password'>;
