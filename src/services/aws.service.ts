import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsBucketFolders, IMultipleUploadFiles } from 'src/types';
import { IAwsService } from 'src/types/aws.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService implements IAwsService {
  s3: S3.ClientConfiguration | any;
  constructor() {
    this.s3 = new S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SERCET_ACCESS_KEY,
    });
  }

  async uploadImg(base64: string, folder: AwsBucketFolders) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const base64Data = new Buffer.from(
      base64.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const expansion = base64.split(';')[0].split('/')[1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${uuidv4()}.${expansion}`,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${expansion}`,
    };

    const res = await this.s3.upload(params).promise();
    return res.Location;
  }

  async uploadFile(
    base64: string,
    expansion: string,
    folder: AwsBucketFolders,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const base64Data = new Buffer.from(
      base64.replace(/^data:.+\/\w+;base64,/, ''),
      'base64',
    );
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${folder}/${uuidv4()}.${expansion}`,
      Body: base64Data,
      ContentEncoding: 'base64',
    };

    const res = await this.s3.upload(params).promise();
    return res.Location;
  }

  async uploadMultipleFiles(
    files: IMultipleUploadFiles[],
    folder: AwsBucketFolders,
  ) {
    const locationsArray: string[] = [];
    Promise.all(
      files.map(async (file) => {
        const document = await this.uploadFile(
          file.base64File,
          file.ext,
          folder,
        ).catch(() => {
          throw new BadRequestException('Files were not downloaded.');
        });
        locationsArray.push(document);
      }),
    );
    return locationsArray;
  }

  async deleteFile(location: string) {
    const key = `${location.split('/').reverse()[1]}/${
      location.split('/').reverse()[0]
    }`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    await this.s3.deleteObject(params, (err, data) => {
      if (err) console.log(err);
    });

    return { success: true };
  }

  async deleteMultipleFiles(locations: string[]) {
    for (let i = 0; i < locations.length; i++) {
      await this.deleteFile(locations[i]);
    }
  }
}
