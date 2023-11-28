import React, { useState } from "react";

const Hamburger: React.FC = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="cursor-pointer ml-2 flex flex-col space-y-1.5"
        onClick={toggleMenu}
      >
        <span className="block w-6 h-[2px] bg-gray-800" />
        <span className="block w-6 h-[2px] bg-gray-800" />
        <span className="block w-6 h-[2px] bg-gray-800" />
      </div>
    </div>
  );
};

export default Hamburger;
