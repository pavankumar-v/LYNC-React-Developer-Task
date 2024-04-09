import api from '@/utils/api';
import { Book } from '@/interface';

export async function getBooks(): Promise<Book[]> {
  const res = await api.get<{ items: Book[]; totalItems: number }>(
    '/books/v1/volumes?q=quilting'
  );

  return res.data.items;
}

export async function getBook(volumeId: string): Promise<Book | null> {
  try {
    const res = await api.get<Book>(`/books/v1/volumes/${volumeId}`);
    return res.data;
  } catch (error) {
    return null;
  }
}
