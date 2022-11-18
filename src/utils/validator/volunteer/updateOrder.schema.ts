import { JSONSchemaType } from 'ajv';
import { UpdateOrderDto } from 'src/volunteer/dto/update-order.dto';

export const UpdateOrderSchema: JSONSchemaType<UpdateOrderDto> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    info: {
      type: 'string',
    },
  },
  required: ['title', 'info'],
  additionalProperties: false,
};
