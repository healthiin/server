import { Provider, Type } from '@nestjs/common';

export function proxy(service: Type, injectClasses: Type<any>[]): Provider {
  return {
    provide: service,
    inject: injectClasses,
    useFactory: (...inject: unknown[]) => new service(...inject),
  };
}
