import { JSONSchemaType } from 'ajv';
import { UpdateUserDto } from '../dto/update-user.validator.dto';

export const UpdateUserSchema: JSONSchemaType<UpdateUserDto> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      maxLength: 256,
      minLength: 3,
      nullable: true,
    },
    lastname: {
      type: 'string',
      maxLength: 256,
      minLength: 3,
      nullable: true,
    },
    image: {
      type: 'string',
      nullable: true,
    },
  },
  additionalProperties: false,
};
