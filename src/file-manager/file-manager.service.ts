import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { FileTypes, ResourceTypes } from 'src/types/static-img.enum'
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'


@Injectable()
export class FileManagerService {

    createFile(type: FileTypes, resourceType: ResourceTypes, file: any): string {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuid.v4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, '../../', 'static', type, resourceType)

            if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, { recursive: true });
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)

            return `${type}/${resourceType}/${fileName}`
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    deleteFile(filePath: string) {
        fs.unlink(path.join(__dirname, '../../', 'static', filePath), () => { })
    }
}