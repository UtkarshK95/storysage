import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const companyName = "StorySage";

  return (
    <footer className="bg-gray-200 p-4 text-center mt-auto">
      <p className="text-gray-600">
        &copy; {currentYear} {companyName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
