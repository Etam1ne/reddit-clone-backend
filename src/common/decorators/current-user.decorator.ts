import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { decode } from 'jsonwebtoken';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const token = request.headers.authorization?.replace('Bearer ', '');

    const decoded: any = decode(token);
    request.user = decoded.user;
    return decoded.user;
  },
);
