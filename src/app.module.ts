import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthzModule } from './authz/authz.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [AuthzModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
