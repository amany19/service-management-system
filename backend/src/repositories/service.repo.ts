import { PrismaClient } from "@prisma/client";
import { IServiceRepository } from "./persistence";
import { ServiceType, CreateServiceDTO, UpdateServiceDTO } from "../types/service.types";

const prisma = new PrismaClient();

export class ServiceRepository implements IServiceRepository {
  private mapToServiceType(service: any): ServiceType {
    return {
      id: service.id,
      name: service.name,
      price: service.price,
      category: service.category,
      createdAt: service.createdAt.toISOString(),
    };
  }

  async create(data: CreateServiceDTO): Promise<ServiceType> {
    const service = await prisma.service.create({ data });
    return this.mapToServiceType(service);
  }

  async findAll(): Promise<ServiceType[]> {
    const services = await prisma.service.findMany({ orderBy: { createdAt: "desc" } });
    return services.map(this.mapToServiceType);
  }

  async findById(id: number): Promise<ServiceType | null> {
    const service = await prisma.service.findUnique({ where: { id } });
    return service ? this.mapToServiceType(service) : null;
  }

  async update(id: number, data: UpdateServiceDTO): Promise<ServiceType> {
    const service = await prisma.service.update({ where: { id }, data });
    return this.mapToServiceType(service);
  }

  async delete(id: number): Promise<void> {
    await prisma.service.delete({ where: { id } });
  }
}
