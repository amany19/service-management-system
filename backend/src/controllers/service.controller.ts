import { Request, Response, NextFunction } from "express";
import { ServiceService } from "../services/service.service";
import { AppError } from "../errors/AppError";
import { IServiceService } from "../services/interfaces";

export class ServiceController {
constructor(private serviceService: IServiceService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const service = await this.serviceService.createService(data);
      res.status(201).json(service);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const services = await this.serviceService.getServices();
      res.json(services);
    } catch (err) {
      next(err);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await this.serviceService.getServiceById(+req.params.id);
      if (!service) throw new AppError("Service not found", 404);
      res.json(service);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const service = await this.serviceService.updateService(+req.params.id, req.body);
      res.json(service);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.serviceService.deleteService(+req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
