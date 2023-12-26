import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContexts";
import { useFSContext } from "../contexts/FSContexts";
import { FSType } from "../types/FSType";
import FSMenuItem from "../components/FSMenuItem";

const FSMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();
  const { FSs, readFSs, addFS, targetFS, handleSetTargetFS, readFS } =
    useFSContext();

  const toggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
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

  const handleAddFS = async () => {
    await addFS();
    handleSetTargetFS(undefined);
  };

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform transition duration-200 ease-in-out bg-white w-2/3 max-w-[350px] h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-[350px] lg:duration-0`}
      >
        {/* メニュー内容をここに入れる */}
        <div
          onClick={handleAddFS}
          className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer  hover:text-slate-500 "
        >
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4 text-[16px]">
          {FSs.map((FS) => (
            <FSMenuItem key={FS.id} FS={FS} toggleMenu={toggleMenu} />
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
