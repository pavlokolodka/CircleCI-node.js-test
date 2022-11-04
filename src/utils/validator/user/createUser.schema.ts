import { JSONSchemaType } from "ajv";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { email } from "./email.schema";
import { password } from "./password.schema";


export const CreateUserSchema: JSONSchemaType<CreateUserDto> = {
  type: "object",
  properties: {
    email: email,
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
    password: password,
    photo: {type: "string", nullable: true}
   },
  required: ["email", "name", "lastname", "password"],
  additionalProperties: false
}