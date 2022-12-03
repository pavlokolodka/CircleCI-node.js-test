import { JSONSchemaType } from 'ajv';
import { UpdateHintPhotoDto } from '../dto/update-hint-photo.dto';

export const UpdateHintPhotoSchema: JSONSchemaType<UpdateHintPhotoDto> = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
    },
    photo: {
      type: 'string',
    },
  },
  required: ['text', 'photo'],
  additionalProperties: false,
};
