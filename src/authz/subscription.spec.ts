import { subscription } from './subscriptions';

describe('Subscription', () => {
  test('A Basic subscription allows Basic features', () => {
    const result = subscription('BASIC').allows('BASIC');
    expect(result).toBe(true);
  });
  test('A Basic subscription does not allow Premium features', () => {
    const result = subscription('BASIC').allows('PREMIUM');
    expect(result).toBe(false);
  });
  test('A Premium subscription allows Basic features', () => {
    const result = subscription('PREMIUM').allows('BASIC');
    expect(result).toBe(true);
  });
  test('A Premium subscription allows Premium features', () => {
    const result = subscription('PREMIUM').allows('PREMIUM');
    expect(result).toBe(true);
  });
});
