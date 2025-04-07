import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { SUBSCRIPTION_HEADER } from '../src/authz/subscription.header';
import { Subscription } from '../src/authz/subscriptions';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/content/generate (POST) - generates content successfully', () => {
    return request(app.getHttpServer())
      .post('/content/generate')
      .set(SUBSCRIPTION_HEADER, Subscription.Basic)
      .send()
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({
          content: expect.any(String),
        });
      });
  });

  it('/templates (GET) - returns a list of templates', () => {
    return request(app.getHttpServer())
      .get('/content/templates')
      .set(SUBSCRIPTION_HEADER, Subscription.Basic)
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual([
          {
            id: expect.any(String),
            name: expect.any(String),
            description: expect.any(String),
          },
        ]);
      });
  });
});
