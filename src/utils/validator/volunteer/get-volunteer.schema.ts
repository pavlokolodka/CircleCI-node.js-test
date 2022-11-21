import { JSONSchemaType } from 'ajv';
import { GetVolunteerDto } from '../dto/get-volunteer.dto';

export const GetVolunteerSchema: JSONSchemaType<GetVolunteerDto> = {
  type: 'object',
  properties: {
    country: {
      type: 'string',
      maxLength: 40,
      minLength: 3,
    },
    city: {
      type: 'string',
      maxLength: 30,
      minLength: 3,
    },
    card_number: {
      type: 'string',
      minLength: 8,
    },
    document: {
      type: 'string',
    },
    userId: {
      type: 'integer',
    },
    expansion: {
      type: 'string',
    },
  },
  required: [
    'userId',
    'city',
    'card_number',
    'country',
    'document',
    'expansion',
  ],
  additionalProperties: false,
};
