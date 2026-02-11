export type RequestStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface RequestType {
  id: number;
  status: RequestStatus;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  service: {
    id: number;
    name: string;
    price: number;
    category: string;
  };
}

export interface CreateRequestDTO {
  userId: number;
  serviceId: number;
}

export interface UpdateRequestStatusDTO {
  id: number;
  status: RequestStatus;
}
