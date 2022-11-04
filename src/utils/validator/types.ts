import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { LoginUserDto } from "src/auth/dto/login-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export type SchemaType = CreateUserDto | LoginUserDto | UpdateUserDto;