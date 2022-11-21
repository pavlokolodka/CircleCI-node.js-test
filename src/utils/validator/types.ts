import { AdminResetPassDto } from 'src/admin/admin-password/dto/admin-reset-pass.dto';
import { AdminUpdatePassDto } from 'src/admin/admin-password/dto/admin-update-pass.dto';
import { LoginAdminDto } from 'src/admin/auth/dto/login-admin.dto';
import { EmailDto } from 'src/password/dto/email.dto';
import { ResetPasswordDto } from 'src/password/dto/reset-password.dto';
import { UpdatePasswordDto } from 'src/password/dto/update-password.dto';
import { CreateOrderDto } from 'src/volunteer/dto/create-order.dto';
import { UpdateOrderDto } from 'src/volunteer/dto/update-order.dto';
import { CreateUserDto } from './dto/create-user.validator.dto';
import { LoginUserDto } from './dto/login-user.validator.dto';
import { UpdateUserDto } from './dto/update-user.validator.dto';
import { AllOrdersDto } from './dto/allOrders.dto';

export type SchemaType =
  | CreateUserDto
  | LoginUserDto
  | UpdateUserDto
  | EmailDto
  | LoginAdminDto
  | AdminResetPassDto
  | AdminUpdatePassDto
  | ResetPasswordDto
  | UpdatePasswordDto
  | CreateOrderDto
  | UpdateOrderDto
  | AllOrdersDto;
