import { JSONSchemaType } from 'ajv';
import { CreateHintDto } from '../dto/create-hint.dto';

export const CreateHintSchema: JSONSchemaType<CreateHintDto> = {
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
