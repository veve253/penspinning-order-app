import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFSContext } from "../contexts/FSContexts";
import { Trick } from "../types/trickType";
import { useAuthContext } from "../contexts/AuthContexts";

const TrickForm = () => {
  const trickRef = useRef<HTMLInputElement>(null);
  const { addTrick, selectedFS, setSelectedFS } = useFSContext();
  const { user } = useAuthContext();

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
        trickRef.current.value = ""; // フォームをクリア
      }
    }
  };

  return (
    <form onSubmit={handleAddTrick} className="flex justify-center">
      <input
        type="text"
        className="border-b p-1 mr-2 w-[250px] focus:outline-none focus:border-sky-600"
        placeholder="技を入力"
        ref={trickRef}
      />
      <button
        type="submit"
        className="bg-sky-400 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-full"
      >
        追加
      </button>
    </form>
  );
};

export default TrickForm;
