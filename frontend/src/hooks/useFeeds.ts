import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';


interface UseGetFeedReturn {
  data: any[] | null;
  error: Error | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

export const useGetFeed = (
  language: string,
  year: string,
  month: string,
  day: string
): UseGetFeedReturn => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{ onthisday: any[] }> = await axios.get(`http://localhost:8000/feed/${language}/featured/${year}/${month}/${day}`);
      const pages: any[] = [];
      response.data.onthisday.forEach((feeds) => {
        pages.push(...feeds.pages);
      });
      setData(pages);
      setError(null);
    } catch (err) {
      setError(Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

  }, [language, year, month, day]);

  return { data, error, loading, refetch: fetchData };
};

export const useGetFeedTranslate = (
  toLanguage: string,
  fromLanguage: string,
  year: string,
  month: string,
  day: string
): UseGetFeedReturn => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<{onthisday: any[]}> = await axios.get(`http://localhost:8000/feed/translate/${toLanguage}/${fromLanguage}/${year}/${month}/${day}`);
      const pages: any[] = [];
      response.data.onthisday.forEach((feeds) => {
        pages.push(...feeds.pages);
      });
      setData(pages);
      setError(null);
    } catch (err) {
      setError(Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toLanguage, fromLanguage, year, month, day]);

  return { data, error, loading, refetch: fetchData };
};