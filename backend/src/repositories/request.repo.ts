import { PrismaClient, RequestStatus } from "@prisma/client";
import { IRequestRepository } from "./persistence";
import { RequestType, CreateRequestDTO, UpdateRequestStatusDTO } from "../types/request.types";

const prisma = new PrismaClient();

export class RequestRepository implements IRequestRepository {
  private mapToRequestType(r: any): RequestType {
    return {
      id: r.id,
      status: r.status,
      createdAt: r.createdAt.toISOString(),
      user: { id: r.user.id, name: r.user.name, email: r.user.email },
      service: { id: r.service.id, name: r.service.name, price: r.service.price, category: r.service.category },
    };
  }

  async create(data: CreateRequestDTO): Promise<RequestType> {
    const r = await prisma.serviceRequest.create({
      data: { userId: data.userId, serviceId: data.serviceId },
      include: { user: true, service: true },
    });
    return this.mapToRequestType(r);
  }

  async findAll(): Promise<RequestType[]> {
    const requests = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: true, service: true },
    });
    return requests.map(this.mapToRequestType);
  }

  async updateStatus(data: UpdateRequestStatusDTO): Promise<RequestType> {
    const r = await prisma.serviceRequest.update({
      where: { id: data.id },
      data: { status: data.status as RequestStatus },
      include: { user: true, service: true },
    });
    return this.mapToRequestType(r);
  }
}
