import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useAuthContext } from "../contexts/AuthContexts";

const Hamburger: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="lg:hidden cursor-pointer ml-2 flex flex-col space-y-1.5"
      onClick={toggleMenu}
    >
      <span className="block w-6 h-[2px] bg-gray-800" />
      <span className="block w-6 h-[2px] bg-gray-800" />
      <span className="block w-6 h-[2px] bg-gray-800" />
    </div>
  );
};

export default Hamburger;
