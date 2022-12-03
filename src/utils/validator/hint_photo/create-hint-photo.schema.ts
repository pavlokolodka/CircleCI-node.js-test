import { JSONSchemaType } from 'ajv';
import { CreateHintPhotoDto } from '../dto/create-hint-photo.dto';

export const CreateHintPhotoSchema: JSONSchemaType<CreateHintPhotoDto> = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
    hintId: {
      type: 'number',
    },
  },
  required: ['text', 'hintId', 'photo'],
  additionalProperties: false,
};
