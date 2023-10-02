import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton text="Back" />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4">
          {renderBookInfo("Id", book._id)}
          {renderBookInfo("Title", book.title)}
          {renderBookInfo("Author", book.author)}
          {renderBookInfo("Publish Year", book.publishYear)}
          {renderBookInfo("Create Time", new Date(book.createdAt).toString())}
          {renderBookInfo(
            "Last Update Time",
            new Date(book.updatedAt).toString()
          )}
        </div>
      )}
    </div>
  );
};

const renderBookInfo = (label, value) => (
  <div key={label} className="my-4">
    <span className="text-xl mr-4 text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

export default ShowBook;
