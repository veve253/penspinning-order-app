import { FC, useEffect, useRef, useState } from "react";
import { useFSContext } from "../contexts/FSContexts";
import { Trick } from "../types/trickType";

const TrickElem: FC<{
  id: string;
  index: number;
  name: string;
}> = ({ id, index, name }) => {
  const { deleteTrick, selectedFS, setSelectedFS, updateTrick } =
    useFSContext();

  const [clicked, setClicked] = useState(false);

  const inputTrickRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clicked ? inputTrickRef.current?.focus() : inputTrickRef.current?.blur();
  }, [clicked]);

  const handleOnClick = async () => {
    setClicked(true);
  };

  const handleOnBlur = () => {
    setClicked(false);
  };

  // trickの変更をUIに反映
  const handleUpdateTrick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFS = selectedFS.map((trick: Trick) =>
      trick.id === id ? { ...trick, trick: event.target.value } : trick
    );

    setSelectedFS(newFS);
  };

  // trickの変更をバックエンドに反映
  const applyUpdatingTrick = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateTrick(id, event.target.value);
  };

  const handleDeleteTrick = () => {
    deleteTrick(id);
  };

  return (
    <div className="flex justify-between border mx-auto text-[16px] w-4/5 min-h-[32px] rounded-xl">
      <div className="w-6 my-auto h-full flex items-center justify-center">
        {index + 1}
      </div>
      <div
        onClick={handleOnClick}
        onBlur={handleOnBlur}
        className="py-auto pl-4 flex items-center min-h-[32px] w-full border-l break-words break-all"
      >
        {clicked ? (
          <span className="my-auto flex w-full">
            <input
              type="text"
              value={name}
              ref={inputTrickRef}
              onChange={handleUpdateTrick}
              onBlur={applyUpdatingTrick}
              className="w-full focus:underline underline-offset-4 cursor-pointer focus:outline-none"
            />
          </span>
        ) : (
          name
        )}
      </div>
      <button
        onClick={handleDeleteTrick}
        className="w-8 p-[1px] my-auto mr-[1.5px] h-full text-[10px] flex items-center justify-center hover:bg-gray-200 rounded-full"
      >
        削除
      </button>
    </div>
  );
};

export default TrickElem;
