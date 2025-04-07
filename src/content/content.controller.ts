import { Controller, Get, Post } from '@nestjs/common';

@Controller('content')
export class ContentController {
  @Post('generate')
  generateContent() {
    return {
      content: 'Generated content goes here',
    };
  }

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
