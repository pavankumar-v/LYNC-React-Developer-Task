import React, { useContext } from 'react';
import Button from '@ui/Button';
import { BookContext, BookContextType } from '@/contexts/BookContext';
import { AuthContext } from '@/contexts/AuthContext';
import { Book } from '@/interface';

type Props = {
  book: Book;
};

const BookmarkButton: React.FC<Props> = ({ book }) => {
  const { addToBookMarks, bookmarks } = useContext(
    BookContext
  ) as BookContextType;
  const { user } = useContext(AuthContext);

  const isBookMarked = bookmarks.find((bookmarks) => {
    return bookmarks.bookId == book.id && bookmarks.userId == user?.id;
  })
    ? true
    : false;

  function handleAddBookmark(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.stopPropagation();
    if (user) {
      addToBookMarks(book, user);
    }
  }

  if (isBookMarked) {
    return <p className="text-accent">Bookmarked</p>;
  }

  if (user) {
    return (
      <Button onClick={handleAddBookmark} disabled={isBookMarked}>
        Bookmark
      </Button>
    );
  }

  return null;
};

export default BookmarkButton;
