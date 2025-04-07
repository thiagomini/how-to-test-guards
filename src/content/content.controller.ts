import { Controller, Post } from '@nestjs/common';

@Controller('content')
export class ContentController {
  @Post('generate')
  generateContent() {
    return {
      content: 'Generated content goes here',
    };
  }
}
