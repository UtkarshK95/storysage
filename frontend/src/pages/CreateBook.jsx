import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveBook = () => {
    setLoading(true);
    axios
      .post("http://localhost:5555/books", bookData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("An error occurred. Please check console.", {
          variant: "error",
        });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <InputField
          label="Title"
          name="title"
          value={bookData.title}
          onChange={handleChange}
        />
        <InputField
          label="Author"
          name="author"
          value={bookData.author}
          onChange={handleChange}
        />
        <InputField
          label="Publish Year"
          name="publishYear"
          value={bookData.publishYear}
          onChange={handleChange}
          type="number"
        />
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="my-4">
    <label className="text-xl mr-4 text-gray-500">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border-2 border-gray-500 px-4 py-2 w-full"
    />
  </div>
);

export default CreateBook;
