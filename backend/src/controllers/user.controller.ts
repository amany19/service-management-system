import { Request, Response } from 'express';
import { IUserService } from '../services/interfaces';

export class UserController {
  constructor(private userService: IUserService) {}

  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const user = await this.userService.getUserById(id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const updated = await this.userService.updateUser(
        id,
        req.body
      );

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await this.userService.deleteUser(id);

      res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
