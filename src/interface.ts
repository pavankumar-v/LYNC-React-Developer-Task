export interface User {
  id: string;
  email: string;
}

export interface CartItem {
  id: string;
  bookId: string;
  userId: string;
}

export interface Bookmarks {
  id: string;
  userId: string;
  bookId: string;
}

export interface Orders {
  id: string;
  bookId: string;
  userId: string;
  createdAt: Date;
}

export enum BookSaleAbility {
  FOR_SALE = 'FOR_SALE',
  NOT_FOR_SALE = 'NOT_FOR_SALE',
}

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    language: 'en';
    imageLinks: {
      smallThubnail: string;
      thumbnail: string;
    };
    description: string;
    pageCount: number;
    previewLink: string;
  };
  saleInfo: {
    saleability: BookSaleAbility;
    listPrice?: {
      amount: number;
      currencyCode: 'INR' | 'USD';
    };
  };
}
