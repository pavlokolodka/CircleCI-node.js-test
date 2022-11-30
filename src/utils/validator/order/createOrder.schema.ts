import { JSONSchemaType } from 'ajv';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';

export const CreateOrderSchema: JSONSchemaType<CreateOrderDto> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    info: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
    goal_amount: {
      type: 'number',
    },
    short_info: {
      type: 'string',
    },
    finished_at: {
      type: 'string'
    },
  },
  required: [
    'title',
    'info',
    'photo',
    'goal_amount',
    'short_info',
    'finished_at',
  ],
  additionalProperties: false,
};
