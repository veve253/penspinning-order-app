import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [adding, setAdding] = useState(false);
  const [newFSName, setNewFSName] = useState("無題");

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
    console.log("targetFS changed");

    readFS(targetFS?.id);
  }, [targetFS?.id]);

  let blurTimeoutId: number | null = null;

  useEffect(() => {
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => {
      if (blurTimeoutId) clearTimeout(blurTimeoutId);
    };
  }, []);

  const inputRef: any = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [adding]);

  const handleBlur = () => {
    // イベント処理を遅延させる
    blurTimeoutId = window.setTimeout(() => {
      setNewFSName("無題");
      setAdding(false);
    }, 100);
  };

  const handleAddFS = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addFS(newFSName);
    console.log("added");
    // handleSetTargetFS(undefined);
    setNewFSName("無題");
    setAdding(false);
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
          onClick={() => setAdding(true)}
          className="flex mx-auto w-[40%] px-3 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer  hover:text-slate-500 "
        >
          <span className="pr-2">＋</span>
          <h1>New Combo</h1>
        </div>

        <ul className="w-full mt-4 text-[16px]">
          {adding && (
            <div
              tabIndex={0}
              onBlur={handleBlur}
              className="flex h-10 justify-between border-y border-sky-600 break-words break-all"
            >
              <form
                onSubmit={handleAddFS}
                className="w-full flex justify-between"
              >
                <input
                  type="text"
                  value={newFSName}
                  ref={inputRef}
                  onChange={(e) => setNewFSName(e.target.value)}
                  className="mx-2 my-auto h-6 bg-transparent cursor-pointer w-full border-b-[0.5px] focus:border-sky-600 underline-offset-0 focus:outline-none"
                />
                <button className="flex items-center justify-center text-center rounded-full w-10 h-7 my-auto bg-sky-400 hover:bg-blue-700 text-white p-[1.5px] text-xs">
                  追加
                </button>
              </form>
            </div>
          )}
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
