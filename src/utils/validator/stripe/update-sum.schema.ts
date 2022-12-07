import { JSONSchemaType } from 'ajv';
import { UpdateSumDto } from '../dto/update-sum.dto';

export const UpdateSumSchema: JSONSchemaType<UpdateSumDto> = {
  type: 'object',
  properties: {
    orderId: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
  },
  required: ['orderId', 'amount'],
  additionalProperties: false,
};
