import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <TableHeader>NO</TableHeader>
          <TableHeader>Title</TableHeader>
          <TableHeader>Author</TableHeader>
          <TableHeader>Publish Year</TableHeader>
          <TableHeader>Operations</TableHeader>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <TableRow key={book._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.publishYear}</TableCell>
            <TableOperations>
              <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className="text-2xl text-green-800" />
              </Link>
              <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600" />
              </Link>
              <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-600" />
              </Link>
            </TableOperations>
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

const TableHeader = ({ children }) => (
  <th className="border border-slate-600 rounded-md">{children}</th>
);

const TableCell = ({ children }) => (
  <td className="border border-slate-700 rounded-md text-center">{children}</td>
);

const TableOperations = ({ children }) => (
  <td className="border border-slate-700 rounded-md text-center">
    <div className="flex justify-center gap-x-4">{children}</div>
  </td>
);

const TableRow = ({ children }) => <tr className="h-8">{children}</tr>;

export default BooksTable;
