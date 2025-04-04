export const Subscription = {
  Free: 'FREE',
  Basic: 'BASIC',
  Premium: 'PREMIUM',
} as const;

export type SubscriptionEnum = (typeof Subscription)[keyof typeof Subscription];
