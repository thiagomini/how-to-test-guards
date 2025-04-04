import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Subscription, SubscriptionEnum } from './subscriptions';
import { SUBSCRIPTION_KEY } from './subscription.decorator';
import { SUBSCRIPTION_HEADER } from './subscription.header';

@Injectable()
export class SubscriptionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredSubscription = this.reflector.getAllAndOverride<
      SubscriptionEnum | undefined
    >(SUBSCRIPTION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredSubscription) {
      return true;
    }

    const userSubscription: string = context.switchToHttp().getRequest()
      .headers[SUBSCRIPTION_HEADER];

    switch (requiredSubscription) {
      case Subscription.Basic: {
        return (
          userSubscription === Subscription.Basic ||
          userSubscription === Subscription.Premium
        );
      }
      case Subscription.Premium: {
        return userSubscription === Subscription.Premium;
      }
      default: {
        return false;
      }
    }
  }
}
