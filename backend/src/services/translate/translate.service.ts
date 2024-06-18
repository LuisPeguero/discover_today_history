import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslateService {
  public static async translate(
    source: string,
    target: string,
    text: string,
  ): Promise<any> {
    const url = `${process.env.TRANSLATE_API_URL}/translate`;
    console.log(url);

    const response = await axios.post(
      url,
      {
        q: text,
        source: source,
        target: target,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.status !== 200) {
      throw new Error('translate api ' + response.status);
    }

    return response.data.translatedText;
  }
}
