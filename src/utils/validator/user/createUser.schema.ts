import { JSONSchemaType } from 'ajv';
import { CreateUserDto } from '../dto/create-user.validator.dto';
import { email } from '../shared/email.schema';
import { password } from '../shared/password.schema';

export const CreateUserSchema: JSONSchemaType<CreateUserDto> = {
  type: 'object',
  properties: {
    email: email,
    name: {
      type: 'string',
      maxLength: 256,
      minLength: 3,
    },
    lastname: {
      type: 'string',
      maxLength: 256,
      minLength: 3,
    },
    password: password,
    photo: { type: 'string', nullable: true },
    recaptchaToken: { type: 'string', nullable: true }
  },
  required: ['email', 'name', 'lastname', 'password'],
  additionalProperties: false,
};
