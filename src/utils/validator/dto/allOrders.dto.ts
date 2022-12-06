import { OrderStatusEnum } from '../../../types/order-status.enum';

export class AllOrdersDto {
  page: string;
  limit: string;
  sort: string;
  search: string;
  status: OrderStatusEnum;
}
