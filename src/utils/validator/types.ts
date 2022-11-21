import { CreateUserDto } from './dto/create-user.validator.dto';
import { LoginUserDto } from './dto/login-user.validator.dto';
import { UpdateUserDto } from './dto/update-user.validator.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { GetVolunteerDto } from './dto/get-volunteer.dto';

export type SchemaType =
  | CreateUserDto
  | LoginUserDto
  | UpdateUserDto
  | ApproveRequestDto
  | GetVolunteerDto;
