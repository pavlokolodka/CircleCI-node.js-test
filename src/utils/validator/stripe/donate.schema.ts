import { JSONSchemaType } from 'ajv';
import { DonateDto } from '../dto/donate.dto';

export const DonateSchema: JSONSchemaType<DonateDto> = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
    },
    currency: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    order_id: {
      type: 'number',
    },
  },
  required: ['amount', 'currency', 'description', 'order_id'],
  additionalProperties: false,
};
