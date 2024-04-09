import api from '@/utils/api';
import { Book } from '@/interface';

export async function getBooks(): Promise<Book[]> {
  const res = await api.get<{ items: Book[]; totalItems: number }>(
    '/books/v1/volumes?q=quilting'
  );

  return res.data.items;
}
