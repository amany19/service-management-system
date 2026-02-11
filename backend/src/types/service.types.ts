export interface ServiceType {
  id: number;
  name: string;
  price: number;
  category: string;
  createdAt: string;
}

export interface CreateServiceDTO {
  name: string;
  price: number;
  category: string;
}

export interface UpdateServiceDTO {
  name?: string;
  price?: number;
  category?: string;
}
