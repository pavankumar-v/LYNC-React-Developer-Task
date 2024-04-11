import api from '@/utils/api';
import { Book } from '@/interface';
import { QueriesType, Query } from '@/types';

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await api.get<{ items: Book[]; totalItems: number }>(
      "/books/v1/volumes?q=''"
    );

    return res.data.items;
  } catch (error) {
    return [];
  }
}

export async function getBook(volumeId: string): Promise<Book | null> {
  try {
    const res = await api.get<Book>(`/books/v1/volumes/${volumeId}`);
    return res.data;
  } catch (error) {
    return null;
  }
}

export async function searchBookApi(
  searchTerm: string,
  q?: { [key in Query]?: string }
): Promise<Book[]> {
  try {
    if (q) {
      searchTerm += Object.keys(q)
        .map((queryTitle) =>
          q[queryTitle as keyof QueriesType]
            ? `+${q[queryTitle as keyof QueriesType] || ''}`
            : ''
        )
        .join('')
        .trim();
    }

    let path = `/books/v1/volumes?q=${searchTerm}`;
    if (!searchTerm) {
      path = "/books/v1/volumes?q=''";
    }
    const res = await api.get<{ items: Book[]; totalItems: number }>(path);

    return res.data.items;
  } catch (error) {
    return [];
  }
}
