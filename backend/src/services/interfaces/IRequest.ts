import { CreateRequestDTO, UpdateRequestStatusDTO, RequestType } from "../../types/request.types";

export interface IRequestService {
  createRequest(data: CreateRequestDTO): Promise<RequestType>;
  getRequests(): Promise<RequestType[]>;
  updateStatus(data: UpdateRequestStatusDTO): Promise<RequestType>;
}
