import React, { FC, useEffect, useRef, useState } from "react";
import { useFSContext } from "../contexts/FSContexts";
import { FSType } from "../types/FSType";
import { useAuthContext } from "../contexts/AuthContexts";

const FSTitle: FC<{ sorting: boolean; setSorting: any }> = ({
  sorting,
  setSorting,
}) => {
  const {
    targetFS,
    handleSetTargetFS,
    renameFS,
    FSs,
    setFSs,
    updateTrickIndex,
  } = useFSContext();
  const { user } = useAuthContext();
  const [FSName, setFSName] = useState(targetFS?.name);

  useEffect(() => {
    setFSName(targetFS?.name);
  }, [targetFS]);

  // FSMenuから名前が変更されたときに、それを反映
  useEffect(() => {
    handleSetTargetFS(targetFS?.id);
  }, [FSs]);

  const [clicked, setClicked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [renaming, setRenaming] = useState(false);

  const inputFSRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   clicked ? inputFSRef.current?.focus() : inputFSRef.current?.blur();
  // }, [clicked]);

  let blurTimeoutId: number | null = null;

  useEffect(() => {
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => {
      if (blurTimeoutId) clearTimeout(blurTimeoutId);
    };
  }, []);

  useEffect(() => {
    // コンポーネントがマウントされたらinput要素にフォーカスを当てる
    inputFSRef.current?.focus();
  }, [renaming]);

  const handleSetFSName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFSName(event.target.value);
  };

  const handleRenamingFS = () => {
    if (user) {
      if (inputFSRef.current) {
        const newFSName = inputFSRef.current.value
          ? inputFSRef.current.value
          : "無題";
        // タイトルの変更(h2)
        setFSName(newFSName);
        // タイトルの変更(menu)
        setFSs((prev: FSType[]) => {
          const newFS = prev.map((fs: FSType) => {
            if (fs.id === targetFS?.id) {
              return { ...fs, name: newFSName };
            } else {
              return fs;
            }
          });
          return newFS;
        });
        renameFS(
          targetFS?.id,
          inputFSRef.current.value ? inputFSRef.current.value : "無題"
        );
      }
    }
    setRenaming(false);
    // スマホだと、ミートボールメニューが開いたままになるので、閉じる
    setIsOpen(false);
  };

  const handleSortingFS = async () => {
    await updateTrickIndex();
    setSorting(false);
    // スマホだと、ミートボールメニューが開いたままになるので、閉じる
    setIsOpen(false);
  };

  // const applyNewFSName = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   renameFS(targetFS?.id, event.target.value);
  // };

  const handleBlur = () => {
    // イベント処理を遅延させる
    blurTimeoutId = window.setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="w-10"></div>
        <h2 className="px-3 w-full text-center text-xl mb-3 break-words break-all">
          {renaming ? (
            <input
              type="text"
              value={
                FSName !== undefined ? FSName : targetFS ? targetFS.name : ""
              }
              ref={inputFSRef}
              onChange={handleSetFSName}
              className="w-full text-center border-b underline-offset-4 cursor-pointer focus:outline-none"
            />
          ) : FSName !== undefined ? (
            FSName
          ) : targetFS ? (
            targetFS.name
          ) : (
            "コンボ"
          )}
        </h2>

        {sorting ? (
          <button
            className="flex items-center justify-center text-center rounded-full w-10 h-7 bg-sky-400 hover:bg-blue-700 text-white p-[1.5px] text-xs"
            onClick={handleSortingFS}
          >
            完了
          </button>
        ) : renaming ? (
          <button
            className="flex items-center justify-center text-center rounded-full w-10 h-7 bg-sky-400 hover:bg-blue-700 text-white p-[1.5px] text-xs"
            onClick={handleRenamingFS}
          >
            完了
          </button>
        ) : (
          // {/* ミートボールメニュー */}
          <div
            tabIndex={0}
            onBlur={handleBlur}
            className="relative w-10 text-sm"
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer my-auto w-6 h-6 flex justify-around hover:border-gray-100 hover:bg-gray-300 rounded-full"
            >
              <span className="w-1 h-1 my-auto bg-gray-600 rounded-full"></span>
              <span className="w-1 h-1 my-auto bg-gray-600 rounded-full"></span>
              <span className="w-1 h-1 my-auto bg-gray-600 rounded-full"></span>
            </div>
            {isOpen && (
              <div className="absolute flex z-10 flex-col origin-top-right right-0 w-[80px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <button
                  onClick={() => setSorting(true)}
                  className="text-sm py-[2px] text-gray-700 hover:bg-slate-300 hover:text-sky-600 border-b"
                >
                  並び替え
                </button>

                <button
                  onClick={() => setRenaming(true)}
                  className="text-sm py-[2px] hover:bg-slate-300 text-gray-700"
                >
                  名前変更
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FSTitle;
