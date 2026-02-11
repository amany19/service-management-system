import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services';

export class AuthController {
  constructor(private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.authService.register(req.body);
      res.status(201).json({ token });
    } catch (err) {
      next(err); // forward error to centralized error middleware
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this.authService.login(req.body);
      res.json({ token });
    } catch (err) {
      next(err); // forward error
    }
  };
}
