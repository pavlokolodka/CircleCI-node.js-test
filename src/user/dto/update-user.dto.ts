import { ApiProperty } from "@nestjs/swagger"

export class UpdateUserDto {
    @ApiProperty({
        example: 1, description: 'User id', type: Number
    })
    userId: number

    @ApiProperty({
        example: 'Name', description: 'User name', type: String
    })
    name: string

    @ApiProperty({
        example: 'Lastname', description: 'User lastname', type: String
    })
    lastname: string
}