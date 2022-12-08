import { IOrder } from './order.types';

export interface IUser {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: 'customer' | 'volunteer';
  photo?: string;
  orders: IOrder[];
  createdAt: Date;
  updatedAt: Date;
  volunteer_hints?: [];
}
