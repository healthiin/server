import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import {
  AppAbility,
  PermissionFactory,
} from '@app/auth/authorization/permission.factory';
import { CHECK_POLICIES_KEY } from '@app/auth/authorization/policy.decorator';
import { PolicyHandler } from '@app/auth/authorization/types';
import { Request } from '@infrastructure/types/request.types';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionFactory: PermissionFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest() as Request;
    const ability = this.permissionFactory.build(user);

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  protected execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') return handler(ability);
    return handler.handle(ability);
  }
}
