import { ServiceType, CreateServiceDTO, UpdateServiceDTO } from "../../types/service.types";

export interface IServiceRepository {
  create(data: CreateServiceDTO): Promise<ServiceType>;
  findAll(): Promise<ServiceType[]>;
  findById(id: number): Promise<ServiceType | null>;
  update(id: number, data: UpdateServiceDTO): Promise<ServiceType>;
  delete(id: number): Promise<void>;
}
