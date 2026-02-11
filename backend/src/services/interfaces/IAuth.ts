import { LoginDTO, RegisterDTO } from '../../types/auth.types';
import { UserType } from '../../types';

export interface IAuthService {
    register(data: RegisterDTO): Promise<string>;
    login(data: LoginDTO): Promise<string>;
}
