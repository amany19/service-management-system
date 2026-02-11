import {
  ServiceType,
  CreateServiceDTO,
  UpdateServiceDTO,
} from "../../types/service.types";

export interface IServiceService {
  createService(data: CreateServiceDTO): Promise<ServiceType>;
  getServices(): Promise<ServiceType[]>;
  getServiceById(id: number): Promise<ServiceType | null>;
  updateService(id: number, data: UpdateServiceDTO): Promise<ServiceType>;
  deleteService(id: number): Promise<void>;
}
