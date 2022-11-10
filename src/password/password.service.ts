import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RecaptchaService } from 'src/utils/recaptcha';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class PasswordService {
    constructor(private readonly httpService: HttpService,
        private readonly recaptcha: RecaptchaService) { }

    async forgotPassword({ email, recaptchaToken }: ForgotPasswordDto) {
        const recaptchaVerified = await this.recaptcha.check(recaptchaToken)
        if (recaptchaVerified) {
            return await this.httpService.axiosRef.post(
                `${process.env.AUTH_SERVICE_URL}/password/forgot`, { email })
                .then(data => data.data)
                .catch((err) => { throw new BadRequestException(err) })
        }
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        return await this.httpService.axiosRef.patch(
            `${process.env.AUTH_SERVICE_URL}/password/reset`, resetPasswordDto)
            .then(data => data.data)
            .catch((err) => { throw new BadRequestException(err) })
    }

    async updatePassword(updatePasswordDto: UpdatePasswordDto) {
        return await this.httpService.axiosRef.patch(
            `${process.env.AUTH_SERVICE_URL}/password/update`, updatePasswordDto)
            .then(data => data.data)
            .catch((err) => { throw new BadRequestException(err) })
    }
}