import { Request, Response, NextFunction } from "express";
import { RequestService } from "../services/request.service";
import { AppError } from "../errors/AppError";
import { Server } from "socket.io";

export class RequestController {
  constructor(private service: RequestService, private io?: Server) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = await this.service.createRequest(req.body);
      if (this.io) this.io.emit("new_request", request);
      res.status(201).json(request);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const requests = await this.service.getRequests();
      res.json(requests);
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const updated = await this.service.updateStatus(req.body);

      if (this.io) this.io.emit("update_request", updated);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };
}
