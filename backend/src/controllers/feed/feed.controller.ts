import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { FeedService } from '../../services/feed/feed.service';
import { TranslateService } from '../../services/translate/translate.service';

@Controller('feed')
export class FeedController {
  @Get('/:language/featured/:YYYY/:MM/:DD')
  /**
   * Retrieves the feed for a specific date in a given language.
   * @param language - The language of the feed.
   * @param year - The year of the feed.
   * @param month - The month of the feed.
   * @param day - The day of the feed.
   * @returns A string representing the feed.
   */
  async getFeed(
    @Param('language') language: string,
    @Param('YYYY') year: string,
    @Param('MM') month: string,
    @Param('DD') day: string,
  ) {
    try {
      const feeds = await FeedService.getFeaturedContent(
        language,
        year,
        month,
        day,
      );
      return feeds;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('translate/:toLanguage/:language/featured/:YYYY/:MM/:DD')
  /**
   * Retrieves the feed for a specific date in a given language.
   * @param language - The language of the feed.
   * @param year - The year of the feed.
   * @param month - The month of the feed.
   * @param day - The day of the feed.
   * @returns A string representing the feed.
   */
  async getFeedTranslate(
    @Param('toLanguage') toLanguage: string,
    @Param('language') language: string,
    @Param('YYYY') year: string,
    @Param('MM') month: string,
    @Param('DD') day: string,
  ) {
    try {
      const feeds = await FeedService.getFeaturedContent(
        language,
        year,
        month,
        day,
      );
      // Translate properties
      for (const feed of feeds.onthisday) {
        for (const page of feed.pages) {
          page.title = await TranslateService.translate(
            language,
            toLanguage,
            page.title,
          );
          page.description = await TranslateService.translate(
            language,
            toLanguage,
            page.description,
          );
          page.extract = await TranslateService.translate(
            language,
            toLanguage,
            page.extract,
          );
        }
      }

      return feeds;
    } catch (error) {
      return { error: error.message };
    }
  }
}
