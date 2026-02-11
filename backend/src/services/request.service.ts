import { IRequestService } from "./interfaces";
import { IRequestRepository } from "../repositories/persistence";
import { CreateRequestDTO, UpdateRequestStatusDTO, RequestType } from "../types/request.types";

export class RequestService implements IRequestService {
  constructor(private repo: IRequestRepository) {}

  createRequest(data: CreateRequestDTO): Promise<RequestType> {
    return this.repo.create(data);
  }

  getRequests(): Promise<RequestType[]> {
    return this.repo.findAll();
  }

  updateStatus(data: UpdateRequestStatusDTO): Promise<RequestType> {
    return this.repo.updateStatus(data);
  }
}
