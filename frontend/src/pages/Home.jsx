import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import BooksTable from "../components/BooksTable";
import BooksCard from "../components/BooksCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get the initial view mode from localStorage or default to "table"
  const initialViewMode = localStorage.getItem("viewMode") || "table";

  const [showType, setShowType] = useState(initialViewMode);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://vercel.com/utkarshk95/storysage-backend/BLAzDHtbgnZP575SBofjveHPKqFa/books"
        );
        setBooks(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleViewModeToggle = (newViewMode) => {
    setShowType(newViewMode);
    // Store the view mode in localStorage
    localStorage.setItem("viewMode", newViewMode);

    // Send a message to other tabs or windows to update their view mode
    window.postMessage(
      { type: "VIEW_MODE_CHANGE", viewMode: newViewMode },
      "*"
    );
  };

  useEffect(() => {
    // Listen for messages from other tabs or windows to update the view mode
    const handleMessage = (event) => {
      if (event.data.type === "VIEW_MODE_CHANGE") {
        setShowType(event.data.viewMode);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onViewModeToggle={handleViewModeToggle} />
      <div className="flex-grow p-4">
        <div className="flex justify-between items-center">
          <Link to="/books/create">
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md flex items-center space-x-2">
              <MdOutlineAdd className="text-xl" />
              Create Book
            </button>
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-wrap">
            {showType === "table" ? (
              <BooksTable books={books} />
            ) : (
              <BooksCard books={books} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
