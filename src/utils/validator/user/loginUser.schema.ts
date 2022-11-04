import { JSONSchemaType } from "ajv";
import { LoginUserDto } from "src/auth/dto/login-user.dto";
import { email } from "./email.schema";
import { password } from "./password.schema";

export const LoginUserSchema: JSONSchemaType<LoginUserDto> = {
  type: "object",
  properties: { 
    email: email,
    password: password
  },
  required: ["email", "password"],
  additionalProperties: false
}