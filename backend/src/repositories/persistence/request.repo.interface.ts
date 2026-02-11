import { RequestType, CreateRequestDTO, UpdateRequestStatusDTO } from "../../types/request.types";

export interface IRequestRepository {
  create(data: CreateRequestDTO): Promise<RequestType>;
  findAll(): Promise<RequestType[]>;
  updateStatus(data: UpdateRequestStatusDTO): Promise<RequestType>;
}
