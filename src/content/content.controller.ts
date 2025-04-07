import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RequiresSubscription } from '../authz/subscription.decorator';
import { SubscriptionsGuard } from '../authz/subscriptions.guard';

@Controller('content')
@UseGuards(SubscriptionsGuard)
export class ContentController {
  @Post('generate')
  generateContent() {
    return {
      content: 'Generated content goes here',
    };
  }

  @RequiresSubscription('BASIC')
  @Get('templates')
  getTemplates() {
    return [
      {
        id: '1',
        name: 'Template 1',
        description: 'Description of Template 1',
      },
    ];
  }
}
