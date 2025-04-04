import {
  Controller,
  Get,
  INestApplication,
  Module,
  UseGuards,
} from '@nestjs/common';
import { SubscriptionsGuard } from './subscriptions.guard';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { RequiresSubscription } from './subscription.decorator';
import { Subscription } from './subscriptions';

@Controller()
@UseGuards(SubscriptionsGuard)
class TestController {
  @RequiresSubscription(Subscription.Free)
  @Get('/free')
  public freeEndpoint() {
    return 'success';
  }

  @RequiresSubscription(Subscription.Basic)
  @Get('/basic')
  public basicEndpoint() {
    return 'success';
  }

  @RequiresSubscription(Subscription.Premium)
  @Get('/premium')
  public premiumEndpoint() {
    return 'success';
  }
}

@Module({
  controllers: [TestController],
  providers: [SubscriptionsGuard],
})
class TestModuleForGuard {}

describe('SubscriptionsGuard', () => {
  let testApp: INestApplication<App>;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [TestModuleForGuard],
    }).compile();

    testApp = testingModule.createNestApplication();
    await testApp.init();
  });

  afterAll(async () => {
    await testApp.close();
  });

  test('FREE user can access FREE endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/free')
      .set('x-user-subscription', Subscription.Free)
      .expect(200)
      .expect('success');
  });
  test('A Free user cannot access Basic and Premium endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/basic')
      .set('x-user-subscription', Subscription.Free)
      .expect(403);

    await request(testApp.getHttpServer())
      .get('/premium')
      .set('x-user-subscription', Subscription.Free)
      .expect(403);
  });
  test.todo('A Basic user can access Free and Basic endpoints');
  test.todo('A Premium user can access Free, Basic and Premium endpoints');
  test.todo('A Basic user cannot access Premium endpoints');
});
