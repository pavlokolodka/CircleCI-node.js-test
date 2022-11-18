import { JSONSchemaType } from 'ajv';
import { AllOrdersDto } from './dto/allOrders.dto';

export const getAllOrdersSchema: JSONSchemaType<AllOrdersDto> = {
  type: 'object',
  properties: {
    page: {
      type: 'string',
      format: 'string-num',
    },
    limit: {
      type: 'string',
      format: 'string-num',
    },
    sort: {
      type: 'string',
      format: 'sort',
    },
    search: {
      type: 'string',
    },
  },
  required: ['page', 'limit', 'sort', 'search'],
  additionalProperties: false,
};
