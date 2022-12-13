export interface IUser {
  id: number;
  email: string;
  name: string;
  lastname: string;
  role: 'customer' | 'volunteer';
  photo: string | null;
  orders?: IOrder[] | [];
  createdAt: Date;
  updatedAt: Date;
  volunteer_hints?: [];
}

export interface IOrder {
  id: number;
  title: string;
  info: string;
  user_id: number;
  photo: string;
  goal_amount: number;
  sum: number;
  short_info: string;
  finished_at: Date;
  status: 'open' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}
