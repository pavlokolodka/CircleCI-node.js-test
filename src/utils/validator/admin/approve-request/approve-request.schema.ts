import { JSONSchemaType } from 'ajv';
import { ApproveRequestDto } from '../../dto/approve-request.dto';

export const ApproveRequestSchema: JSONSchemaType<ApproveRequestDto> = {
  type: 'object',
  properties: {
    userId: {
      type: 'integer',
    },
    status: {
      type: 'boolean',
    },
    message: {
      type: 'string',
      nullable: true,
    },
  },
  required: ['userId', 'status'],
  additionalProperties: false,
};
