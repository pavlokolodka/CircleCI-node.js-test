import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { SchemaType } from './types';
import ajvErrors from 'ajv-errors';

@Injectable()
export class AjvValidationPipe implements PipeTransform {
  private _ajv: Ajv;

  constructor(private schema: JSONSchemaType<SchemaType>) {
    if (!this._ajv) {
      this._ajv = new Ajv({ allErrors: true, $data: true });
      addFormats(this._ajv);
      ajvErrors(this._ajv);
      this._ajv.addFormat('custom-date', (date) => {
        const dateFormat =
          /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
        if (date.match(dateFormat)) return true;
        else return false;
      });
      this._ajv.addFormat('sort', (sort) => {
        if (sort === 'asc' || sort === 'desc') return true;
        else return false;
      });
      this._ajv.addFormat('string-num', (num) => {
        if (typeof Number(num) === 'number' && Number(num) >= 1) return true;
        else return false;
      });
    }
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.schema) {
      throw new Error('No scheme provided');
    }

    const validate = this._ajv.compile(this.schema);
    const isValid = validate(value);

    if (validate.errors) {
      const resError: Array<string> = [];

      for (const message of validate.errors) {
        const error = message.instancePath + ' ' + message.message;
        resError.push(error);
      }

      throw new BadRequestException(resError);
    }

    return value;
  }
}
