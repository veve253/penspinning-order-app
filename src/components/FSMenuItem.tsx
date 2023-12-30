import React, { FC, useEffect, useState } from "react";
import { FSMenuType, FSType } from "../types/FSType";
import { useFSContext } from "../contexts/FSContexts";

const FSMenuItem: FC<{ FS: FSType; toggleMenu: () => void }> = ({
  FS,
  toggleMenu,
}) => {
  const { targetFS, handleSetTargetFS, deleteFS, renameFS, FSs } =
    useFSContext();

  const [FSName, setFSName] = useState(FS.name);
  const [renaming, setRenaming] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let blurTimeoutId: number | null = null;
  let delTimeoutId: number | null = null;

  useEffect(() => {
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => {
      if (blurTimeoutId) clearTimeout(blurTimeoutId);
    };
  }, []);

  useEffect(() => {
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => {
      if (delTimeoutId) clearTimeout(delTimeoutId);
    };
  }, []);

  const selectMenu = (FS: FSType) => {
    handleSetTargetFS(FS.id);
    toggleMenu();
  };
  const handleDeleteFS = async (id: string) => {
    await deleteFS(id);
    if (id === targetFS?.id) {
      handleSetTargetFS(FSs[1].id);
    }
  };

  const handleRenameFS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFSName(event.target.value);
  };

  const applyRenamingFS = async (id: string, newName: string) => {
    console.log("rename");
    await renameFS(id, newName);
    setRenaming(false);
  };

  const handleBlur = () => {
    // イベント処理を遅延させる
    blurTimeoutId = window.setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div
      className={`flex h-10 justify-between border-b hover:bg-slate-300 break-words break-all ${
        FS.id === targetFS?.id && "bg-sky-100"
      }`}
    >
      {renaming ? (
        <input
          type="text"
          value={FSName}
          onChange={handleRenameFS}
          onBlur={() => applyRenamingFS(FS.id, FSName)}
          className="mx-2 my-auto h-6 bg-transparent cursor-pointer w-full border-b-[0.5px] border-gray-600 underline-offset-0 focus:outline-none"
        />
      ) : (
        <div
          className="p-2 cursor-pointer w-full"
          onClick={() => selectMenu(FS)}
        >
          {FSName}
        </div>
      )}

      {/* ミートボールメニュー */}
      <div tabIndex={0} onBlur={handleBlur} className="relative mt-[14px] ">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer my-auto w-5 h-3 flex"
        >
          <span className="w-1 h-1 my-auto bg-gray-600 rounded-full"></span>
          <span className="w-1 h-1 my-auto bg-gray-600 rounded-full ml-[2px]"></span>
          <span className="w-1 h-1 my-auto bg-gray-600 rounded-full ml-[2px]"></span>
        </div>
        {isOpen && (
          <div className="flex z-10 flex-col origin-top-right absolute right-0 w-[70px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <button
              onClick={() => setRenaming(true)}
              className="text-sm text-gray-700 hover:bg-slate-300 hover:text-sky-600 border-b"
            >
              名前変更
            </button>

            <button
              onClick={() => handleDeleteFS(FS.id)}
              className="text-sm hover:bg-slate-300 text-red-600"
            >
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FSMenuItem;
