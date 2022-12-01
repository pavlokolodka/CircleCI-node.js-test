import { JSONSchemaType } from 'ajv';
import { StatusOfDonateDto } from '../dto/statusOfDonate.dto';

export const StatusDonateSchema: JSONSchemaType<StatusOfDonateDto> = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
    },
    order_id: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
  },
  required: ['status', 'order_id'],
  additionalProperties: false,
};
