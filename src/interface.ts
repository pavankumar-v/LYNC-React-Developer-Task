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
    saleability: 'FOR_SALE' | 'NOT_FOR_SALE';
    listPrice: {
      amount: number;
      currencyCode: 'INR' | 'USD';
    };
  };
}
