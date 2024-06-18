import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { OnThisDayList } from '../../entities/onthisday.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FeedService {
  public static async getFeaturedContent(
    language: string,
    year: string,
    month: string,
    day: string,
  ): Promise<OnThisDayList> {
    const validLanguages = [
      'en',
      'de',
      'fr',
      'sv',
      'pt',
      'ru',
      'es',
      'ar',
      'bs',
    ];

    if (!validLanguages.includes(language)) {
      throw new Error(
        `Invalid language. Must be one of ${validLanguages.join(', ')}`,
      );
    }
    const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/featured/${year}/${month}/${day}`;
    const response = await Axios.get(url);

    if (response.status !== 200) {
      throw new Error('Failed to retrieve feed');
    }

    if (!response.data.onthisday) {
      throw new Error('Failed to retrieve onthisday');
    }

    const feeds = plainToClass(OnThisDayList, response.data);
    return feeds;
  }
}
