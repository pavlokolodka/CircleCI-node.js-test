import { JSONSchemaType } from 'ajv';
import { IdDto } from '../dto/id.dto';

export const IdSchema: JSONSchemaType<IdDto> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'string-num',
    },
  },
  required: [],
  additionalProperties: false,
};
