import { SetMetadata } from '@nestjs/common';
import { SubscriptionEnum } from './subscriptions';

export const SUBSCRIPTION_KEY = Symbol.for('authz:subscription');
export const RequiresSubscription = (subscription: SubscriptionEnum) =>
  SetMetadata(SUBSCRIPTION_KEY, subscription);
