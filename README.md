<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Example repository used as a guide for my [How to Test NestJS Guards](https://dev.to/thiagomini/how-to-test-nestjs-guards-55ma) article.

Its goal is to provide examples on how to create unit, integration and e2e tests for [NestJS Guards](https://docs.nestjs.com/guards), discussing the pros and cons of each type of test.

## Domain

The example domain is a SaaS for AI-Powered Content Generation called "WordWiz".

"WordWiz" helps users generate high-quality marketing content, blog posts, and social media captions using AI. However, the level of access depends on the user's subscription tier:

- **Free Tier**: Limited access, basic AI models, and a low word count limit.
- **Basic Plan**: Access to better AI models, higher word limits, and additional templates.
- **Premium Plan**: Unlimited content generation, advanced AI models, and premium integrations (e.g., SEO analysis, API access).

## Endpoints

- `POST content/generate`: Generates AI-powered content (Free+)
- `GET content/templates`: Retrieves available content templates (Basic+)
- `GET content/analytics`: Provides engagement insights for generated content

All should use a SubscriptionGuard to determine whether a user has access or not to the content.

```mermaid
graph TD;
    A[Incoming Request] -->|Check x-user-plan Header| B{Is Plan Allowed?}

    B -->|Yes| C[Allow Request]
    B -->|No| D[Return 403 Forbidden]
```

### Example Responses

1. `POST content/generate`

```json
{
  "content": "Some Text"
}
```

1. `GET content/templates`

```json
{
  "templates": [
    {
      "id": "blog-post",
      "name": "Blog Post",
      "description": "Structure your blog content with AI assistance."
    },
    {
      "id": "social-media-caption",
      "name": "Social Media Caption",
      "description": "Generate engaging captions for your posts."
    },
    {
      "id": "email-newsletter",
      "name": "Email Newsletter",
      "description": "Craft professional email newsletters quickly."
    }
  ]
}
```

1. `GET content/analytics`

```json
{
  "analytics": {
    "generatedArticles": 25,
    "averageEngagementRate": "0.74",
    "topPerformingArticles": [
      {
        "title": "How to Boost Your SEO with AI",
        "views": 1200,
        "shares": 340,
        "likes": 250
      },
      {
        "title": "5 Tips for Writing Viral Social Media Posts",
        "views": 950,
        "shares": 220,
        "likes": 180
      }
    ],
    "suggestedImprovements": [
      "Use more questions in headlines to increase engagement.",
      "Shorten paragraphs for better readability."
    ]
  }
}
```
