import { JSONSchemaType } from 'ajv';
import { UpdateSumDto } from '../dto/update-sum.dto';

export const UpdateSumSchema: JSONSchemaType<UpdateSumDto> = {
  type: 'object',
  properties: {
    order_id: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
  },
  required: ['order_id', 'amount'],
  additionalProperties: false,
};
