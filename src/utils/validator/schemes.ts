import { CreateUserDto } from "src/auth/dto/create-user.dto"
import { LoginUserDto } from "src/auth/dto/login-user.dto"
import { JSONSchemaType } from 'ajv';



const CreateUserSchema: JSONSchemaType<CreateUserDto> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email"
    },
    name: {
      type: "string",
      maxLength: 256,
      minLength: 3
    },
    lastname: {
      type: "string",
      maxLength: 256,
      minLength: 3
    },
    password: {
      type: "string",
      format: "password",
      minLength: 8
    },
    photo: {type: "string", nullable: true}
   },
  required: ["email", "name", "lastname", "password"],
  additionalProperties: false
}

const LoginUserSchema: JSONSchemaType<LoginUserDto> = {
  type: "object",
  properties: { 
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      format: "password",
      minLength: 8
    }
  },
  required: ["email", "password"],
  additionalProperties: false
}

export {
  CreateUserSchema,
  LoginUserSchema
}
