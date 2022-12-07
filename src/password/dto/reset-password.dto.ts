export class ResetPasswordDto {
  recaptchaToken: string;
  resetToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}
