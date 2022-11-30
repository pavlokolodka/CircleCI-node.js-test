import { JSONSchemaType } from 'ajv';
import { UpdateHintPhotoDto } from '../dto/update-hint-photo.dto';

export const UpdateHintPhotoSchema: JSONSchemaType<UpdateHintPhotoDto> = {
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
