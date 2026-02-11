import { Request, Response } from 'express';
import { AuthService } from '../services';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.register(req.body);
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const token = await this.authService.login(req.body);
      res.json({ token });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
