
export interface RegisterDTO {
  name:string;
  email: string;
  password: string;
  role: 'ADMIN' | 'MOBILE_USER';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
