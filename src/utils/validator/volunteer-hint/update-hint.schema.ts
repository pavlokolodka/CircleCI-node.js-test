import { JSONSchemaType } from 'ajv';
import { UpdateHintDto } from '../dto/update-hint.dto';

export const UpdateHintSchema: JSONSchemaType<UpdateHintDto> = {
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
