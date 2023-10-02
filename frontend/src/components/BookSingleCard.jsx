import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {book.publishYear}
      </h2>
      <h4 className="my-2 text-gray-500">{book._id}</h4>
      <CardItem
        icon={PiBookOpenTextLight}
        text={book.title}
        color="text-red-300"
      />
      <CardItem icon={BiUserCircle} text={book.author} color="text-red-300" />
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <CardLink icon={BiShow} to="#" onClick={handleShowModal} />
        <CardLink icon={BsInfoCircle} to={`/books/details/${book._id}`} />
        <CardLink icon={AiOutlineEdit} to={`/books/edit/${book._id}`} />
        <CardLink icon={MdOutlineDelete} to={`/books/delete/${book._id}`} />
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

const CardItem = ({ icon: Icon, text, color }) => (
  <div className="flex justify-start items-center gap-x-2">
    <Icon className={`${color} text-2xl`} />
    <h2 className="my-1">{text}</h2>
  </div>
);

const CardLink = ({ icon: Icon, to, onClick }) => (
  <Link to={to}>
    <Icon
      className="text-2xl hover:text-black cursor-pointer"
      onClick={onClick}
    />
  </Link>
);

export default BookSingleCard;
