import React from "react";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="flex flex-wrap">
      {books.map((item) => (
        <div
          key={item._id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-2"
        >
          <BookSingleCard book={item} />
        </div>
      ))}
    </div>
  );
};

export default BooksCard;
