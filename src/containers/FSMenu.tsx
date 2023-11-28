import React from "react";

const FSMenu = ({ isOpen, setIsOpen }) => {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-300 ease-in-out bg-white w-2/3 h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col`}
      >
        {/* メニュー内容をここに入れる */}
        <div className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer hover:text-slate-500">
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4">
          <li className="p-2 border-b cursor-pointer hover:bg-slate-300">
            FS1
          </li>
          <li className="p-2 border-b cursor-pointer hover:bg-slate-300">
            Japen 4th kuzu copy
          </li>
          <li className="p-2 border-b cursor-pointer hover:bg-slate-300">
            Japen 提出用
          </li>
          <li className="p-2 border-b cursor-pointer hover:bg-slate-300">
            Twitterに載せたい
          </li>
          <li className="p-2 border-b cursor-pointer hover:bg-slate-300">
            立ち回し用
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default FSMenu;
