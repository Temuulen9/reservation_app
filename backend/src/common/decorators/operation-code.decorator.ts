// src/common/decorators/operation-code.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const OPERATION_CODE_KEY = 'operation_code';

export const OperationCode = (code: string) =>
  SetMetadata(OPERATION_CODE_KEY, code);
