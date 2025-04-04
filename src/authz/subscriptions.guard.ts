import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Subscription, SubscriptionEnum } from './subscriptions';
import { SUBSCRIPTION_KEY } from './subscription.decorator';

@Injectable()
export class SubscriptionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredSubscription =
      this.reflector.getAllAndOverride<SubscriptionEnum>(SUBSCRIPTION_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    const userSubscription = context.switchToHttp().getRequest().headers[
      'x-user-subscription'
    ];

    switch (requiredSubscription) {
      case Subscription.Free: {
        return true;
      }
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
