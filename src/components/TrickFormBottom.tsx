import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFSContext } from "../contexts/FSContexts";
import { useAuthContext } from "../contexts/AuthContexts";
import { Trick } from "../types/trickType";

const TrickFormBottom: React.FC<{
  setClicked: Dispatch<SetStateAction<boolean>>;
}> = ({ setClicked }) => {
  const trickRef = useRef<HTMLInputElement>(null);
  const { addTrick, selectedFS, setSelectedFS } = useFSContext();
  const { user } = useAuthContext();

  useEffect(() => {
    // コンポーネントがマウントされたらinput要素にフォーカスを当てる
    trickRef.current?.focus();
  }, []);

  let blurTimeoutId: number | null = null;
  useEffect(() => {
    // コンポーネントがアンマウントされるときにタイマーをクリアする
    return () => {
      if (blurTimeoutId) clearTimeout(blurTimeoutId);
    };
  }, []);

  const handleBlur = () => {
    blurTimeoutId = window.setTimeout(() => {
      setClicked(false);
    }, 100);
  };

  const handleAddTrick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trickRef.current) {
      const trick = trickRef.current.value;
      if (!trick) {
        alert("技が入力されていません");
      } else if (trick.length > 50) {
        alert("文字数が超過しています");
      } else {
        if (user) {
          addTrick(trick);
        } else {
          setSelectedFS((fs: Trick[]) => {
            const newTrick = {
              id: uuidv4(),
              trick: trick,
              index: selectedFS[0]
                ? selectedFS[selectedFS.length - 1].index + 1
                : 0,
            };
            return [...fs, newTrick];
          });
        }
        setClicked(false);
        trickRef.current.value = ""; // フォームをクリア
      }
    }
  };

  return (
    <div tabIndex={0} onBlur={handleBlur}>
      <div className="text-center">
        <div className="px-auto inline-block align-middle text-gray-400 leading-none w-2 h-2 mb-[1px] border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
      </div>

      <div className="flex justify-between border mx-auto text-base md:text-base w-[320px] md:w-[450px] min-h-[28px] md:min-h-[35px] rounded-xl">
        <form
          onSubmit={handleAddTrick}
          className="flex ml-6 py-auto items-center min-h-[28px] break"
        >
          <input
            type="text"
            className="border-b mr-2 w-[250px] md:w-[380px] focus:outline-none focus:border-sky-600"
            placeholder="技を入力"
            ref={trickRef}
          />
          <button className="w-8 bg-sky-400 hover:bg-blue-700 text-white p-[1px] my-auto mr-[1.5px] h-5/6 text-xs flex items-center justify-center rounded-[14px]">
            追加
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrickFormBottom;
