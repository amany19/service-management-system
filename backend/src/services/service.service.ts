import { IServiceService } from "./interfaces";
import { IServiceRepository } from "../repositories/persistence";
import {
  ServiceType,
  CreateServiceDTO,
  UpdateServiceDTO,
} from "../types/service.types";
export class ServiceService implements IServiceService {
  constructor(private repo: IServiceRepository) {}

  createService(data: CreateServiceDTO): Promise<ServiceType> {
    return this.repo.create(data);
  }

  getServices(): Promise<ServiceType[]> {
    return this.repo.findAll();
  }

  getServiceById(id: number): Promise<ServiceType | null> {
    return this.repo.findById(id);
  }

  updateService(id: number, data: UpdateServiceDTO): Promise<ServiceType> {
    return this.repo.update(id, data);
  }

  deleteService(id: number): Promise<void> {
    return this.repo.delete(id);
  }
}
