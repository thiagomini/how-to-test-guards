export const Subscription = {
  Basic: 'BASIC',
  Premium: 'PREMIUM',
} as const;

export type SubscriptionEnum = (typeof Subscription)[keyof typeof Subscription];

export const subscription = (sub: SubscriptionEnum) => ({
  allows: (feature: SubscriptionEnum) => {
    if (sub === Subscription.Premium) {
      return true;
    }
    if (sub === Subscription.Basic && feature === Subscription.Basic) {
      return true;
    }
    return false;
  },
});

export function isSubscription(sub: string): sub is SubscriptionEnum {
  return Object.values(Subscription).includes(sub as SubscriptionEnum);
}
