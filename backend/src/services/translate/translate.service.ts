import { Injectable } from '@nestjs/common';
import * as unirest from 'unirest';

@Injectable()
export class TranslateService {
  public static async translate(
    source: string,
    target: string,
    text: string,
  ): Promise<any> {
    const url = `${process.env.TRANSLATE_API_URL}/translate`;
    console.log(url);

    const response = await unirest
      .post(url)
      .headers({
        'Content-Type': 'application/json',
      })
      .send(
        JSON.stringify({
          q: text,
          source: source,
          target: target,
        }),
      );

    if (response.error) {
      throw new Error('translate api ' + response.error);
    }

    return response.body.translatedText;
  }
}
