import { Module } from '@nestjs/common';
import { FeedController } from './controllers/feed/feed.controller';
import { FeedService } from './services/feed/feed.service';
import { TranslateService } from './services/translate/translate.service';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [],
  controllers: [FeedController],
  providers: [FeedService, TranslateService],
})
export class AppModule {}
