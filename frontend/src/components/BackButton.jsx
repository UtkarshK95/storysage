import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/", text = "Back" }) => {
  return (
    <Link
      to={destination}
      className="flex items-center text-sky-800 hover:underline"
    >
      <BsArrowLeft className="text-2xl" />
      <span className="ml-1">{text}</span>
    </Link>
  );
};

export default BackButton;
