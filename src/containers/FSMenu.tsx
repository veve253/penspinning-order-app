import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { useFSContext } from "../contexts/FSContexts";
import { FSType } from "../types/FSType";

const FSMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();
  const { FSs, readFSs, addFS, deleteFS, targetFS, handleSetTargetFS, readFS } =
    useFSContext();

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

  const selectMenu = (FS: FSType) => {
    handleSetTargetFS(FS.id);
    toggleMenu();
  };

  const handleAddFS = async () => {
    await addFS();
    handleSetTargetFS();
  };

  const handleDeleteFS = (id: string) => {
    deleteFS(id);
  };

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out bg-white w-2/3 h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col`}
      >
        {/* メニュー内容をここに入れる */}
        <div
          onClick={handleAddFS}
          className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer hover:text-slate-500"
        >
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4">
          {FSs.map((FS) => (
            <div
              key={FS.id}
              className={`flex justify-between border-b ${
                FS === targetFS && "bg-sky-100"
              }`}
            >
              <div
                className="p-2  cursor-pointer hover:bg-slate-300 w-full"
                onClick={() => selectMenu(FS)}
              >
                {FS.name}
              </div>
              <button
                onClick={() => handleDeleteFS(FS.id)}
                className="text-gray-700"
              >
                削除
              </button>
            </div>
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
