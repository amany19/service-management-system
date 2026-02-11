import { PrismaClient } from "@prisma/client";
import { IServiceRepository } from "./persistence";
import { ServiceType, CreateServiceDTO, UpdateServiceDTO } from "../types/service.types";
import { AppError } from "../errors/AppError";

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
    if (!id) throw new AppError("Service ID is required", 400);

    const numericId = Number(id);
    if (isNaN(numericId)) throw new AppError("Invalid service ID", 400);

    const service = await prisma.service.findUnique({ where: { id: numericId } });
    if (!service) throw new AppError("Service not found", 404);

    const hasRequests = await prisma.serviceRequest.findFirst({ where: { serviceId: numericId } });
    if (hasRequests) throw new AppError("Cannot delete service: there are requests using it", 400);

    await prisma.service.delete({ where: { id: numericId } });
  }
}
