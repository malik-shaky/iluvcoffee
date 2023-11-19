import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Protocol = createParamDecorator(
  (defaultValue: string, context: ExecutionContext) => {
    console.log({ defaultValue });
    const request = context.switchToHttp().getRequest();
    return request.protocol;
  },
);
