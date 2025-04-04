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
import { SUBSCRIPTION_HEADER } from './subscription.header';

@Controller()
@UseGuards(SubscriptionsGuard)
class TestController {
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

  test('A Free user can access Free endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/free')
      .expect(200)
      .expect('success');
  });
  test('A Free user cannot access Basic and Premium endpoints', async () => {
    await request(testApp.getHttpServer()).get('/basic').expect(403);

    await request(testApp.getHttpServer()).get('/premium').expect(403);
  });
  test('A Basic user can access Free and Basic endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/free')
      .set(SUBSCRIPTION_HEADER, Subscription.Basic)
      .expect(200)
      .expect('success');

    await request(testApp.getHttpServer())
      .get('/basic')
      .set(SUBSCRIPTION_HEADER, Subscription.Basic)
      .expect(200)
      .expect('success');
  });
  test('A Basic user cannot access Premium endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/premium')
      .set(SUBSCRIPTION_HEADER, Subscription.Basic)
      .expect(403);
  });
  test('A Premium user can access Free, Basic and Premium endpoints', async () => {
    await request(testApp.getHttpServer())
      .get('/free')
      .set(SUBSCRIPTION_HEADER, Subscription.Premium)
      .expect(200)
      .expect('success');

    await request(testApp.getHttpServer())
      .get('/basic')
      .set(SUBSCRIPTION_HEADER, Subscription.Premium)
      .expect(200)
      .expect('success');

    await request(testApp.getHttpServer())
      .get('/premium')
      .set(SUBSCRIPTION_HEADER, Subscription.Premium)
      .expect(200)
      .expect('success');
  });
});
