export const Subscription = {
  Basic: 'BASIC',
  Premium: 'PREMIUM',
} as const;

export type SubscriptionEnum = (typeof Subscription)[keyof typeof Subscription];
