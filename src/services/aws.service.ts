import { Injectable } from '@nestjs/common';
import { S3 } from "aws-sdk";
import { AwsBucketFolders } from 'src/types/aws-bucket-folders.enum';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AwsService {
    s3: S3.ClientConfiguration | any
    constructor() {
        this.s3 = new S3({
            region: process.env.AWS_BUCKET_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SERCET_ACCESS_KEY
        })
    }

    async uploadImg(base64: string, folder: AwsBucketFolders) {
        // @ts-ignore
        const base64Data = new Buffer.from(
            base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        const type = base64.split(';')[0].split('/')[1]

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${folder}/${uuidv4()}.${type}`,
            Body: base64Data,
            ContentEncoding: 'base64',
            ContentType: `image/${type}`
        }

        const res = await this.s3.upload(params).promise()
        return res.Location
    }


    async deleteFile(location: string) {
        const key = `${location.split('/').reverse()[1]}/${location.split('/').reverse()[0]}`
        var params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key
        }
        await this.s3.deleteObject(params, (err, data) => {
            if (err) console.log(err)
        })
    }
}










// export function upload() {
//     const base64 = process.env.IMG! //base64 строка


//     const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
//     const type = base64.split(';')[0].split('/')[1];

//     const params = {
//         Bucket: process.env.AWS_BUCKET_NAME,
//         Key: `${uuidv4()}.${type}`,
//         Body: base64Data,
//         ContentEncoding: 'base64',
//         ContentType: `image/${type}`
//     }

//     return s3.upload(params).promise()
// }


// export async function getFile(key: string) {
//     const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: key }

//     return await s3.getObject(params, (err, data) => {
//         const res = data.Body
//         //console.log(res)
//     }
//     )
// }