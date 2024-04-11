import React, { useContext } from 'react';
import Button from '@ui/Button';
import { BookContext } from '@/contexts/BookContext';
import { AuthContextType, BookContextType } from '@/types';
import { AuthContext } from '@/contexts/AuthContext';
import { Book } from '@/interface';
import { useNavigate } from 'react-router-dom';

type Props = {
  book: Book;
};

const BookmarkButton: React.FC<Props> = ({ book }) => {
  const { addToBookMarks, bookmarks } = useContext(
    BookContext
  ) as BookContextType;
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

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
    } else {
      navigate('/auth/login');
    }
  }

  if (isBookMarked) {
    return <p className="text-accent">Bookmarked</p>;
  }

  return (
    <Button onClick={handleAddBookmark} disabled={isBookMarked}>
      Bookmark
    </Button>
  );
};

export default BookmarkButton;
