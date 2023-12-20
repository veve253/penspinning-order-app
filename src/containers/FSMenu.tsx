import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { useFSContext } from "../contexts/FSContexts";
import { FSType } from "../types/FSType";

const FSMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();
  const {
    FSs,
    readFSs,
    addFS,
    deleteFS,
    renameFS,
    targetFS,
    handleSetTargetFS,
    readFS,
  } = useFSContext();

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

  const handleRenameFS = async (id: string) => {
    const newName: string | null = prompt("新しいFS名を入力");
    if (newName) {
      await renameFS(id, newName);
    }
  };

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform transition duration-200 ease-in-out bg-white w-2/3 h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        {/* メニュー内容をここに入れる */}
        <div
          onClick={handleAddFS}
          className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer  hover:text-slate-500 "
        >
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4">
          {FSs.map((FS) => (
            <div
              key={FS.id}
              className={`flex justify-between border-b hover:bg-slate-300  ${
                FS === targetFS && "bg-sky-100"
              }`}
            >
              <div
                className="p-2  cursor-pointerw-full"
                onClick={() => selectMenu(FS)}
              >
                {FS.name}
              </div>
              <div className="flex">
                <button
                  onClick={() => handleRenameFS(FS.id)}
                  className="text-gray-700 hover:text-sky-600"
                >
                  変更
                </button>

                <button
                  onClick={() => handleDeleteFS(FS.id)}
                  className="text-gray-700 hover:text-red-600"
                >
                  削除
                </button>
              </div>
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
