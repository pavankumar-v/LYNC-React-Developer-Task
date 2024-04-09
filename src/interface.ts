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
  };
}
