import { JSONSchemaType } from 'ajv';
import { CreateHintPhotoDto } from '../dto/create-hint-photo.dto';

export const CreateHintPhotoSchema: JSONSchemaType<CreateHintPhotoDto> = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    text: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
  },
  required: ['text', 'title', 'photo'],
  additionalProperties: false,
};
