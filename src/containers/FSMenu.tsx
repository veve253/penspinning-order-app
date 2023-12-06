import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { useFSContext } from "../contexts/FSContexts";

const FSMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();
  const { FSs, readFSs, targetFS, handleSetTargetFS, readFS } = useFSContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    readFSs();
  }, [user]);

  useEffect(() => {
    handleSetTargetFS();
  }, [FSs]);

  useEffect(() => {
    readFS(targetFS?.id);
  }, [targetFS]);

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out bg-white w-2/3 h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col`}
      >
        {/* メニュー内容をここに入れる */}
        <div className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer hover:text-slate-500">
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4">
          {FSs.map((FS) => (
            <li
              className="p-2 border-b cursor-pointer hover:bg-slate-300"
              key={FS.id}
              onClick={() => handleSetTargetFS(FS.id)}
            >
              {FS.name}
            </li>
          ))}
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
