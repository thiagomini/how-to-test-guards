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

  @RequiresSubscription('PREMIUM')
  @Get('analytics')
  getAnalytics() {
    return {
      generatedArticles: 25,
      averageEngagementRate: 0.74,
      topPerformingArticles: [
        {
          title: 'How to Boost Your SEO with AI',
          views: 1200,
          shares: 340,
          likes: 250,
        },
      ],
      suggestedImprovements: [
        'Use more questions in headlines to increase engagement.',
      ],
    };
  }
}
