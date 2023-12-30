import { FC, useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useFSContext } from "../contexts/FSContexts";
import { Trick } from "../types/trickType";

const TrickElem: FC<{
  id: string;
  index: number;
  name: string;
  sorting: boolean;
}> = ({ id, index, name, sorting }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const { deleteTrick, selectedFS, setSelectedFS, updateTrick } =
    useFSContext();

  const [clicked, setClicked] = useState(false);

  const inputTrickRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clicked ? inputTrickRef.current?.focus() : inputTrickRef.current?.blur();
  }, [clicked]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "auto",
  };

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
    <div
      style={style}
      className="flex justify-between border mx-auto text-sm md:text-base w-full min-h-[28px] md:min-h-[35px] rounded-xl"
    >
      {sorting ? (
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="w-6 my-auto h-full flex items-center justify-center"
        >
          <div className="flex flex-col gap-1">
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-row gap-1">
                {[...Array(2)].map((_, colIndex) => (
                  <span
                    key={colIndex}
                    className="h-1 w-1 bg-gray-400 rounded-full"
                  ></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-6 my-auto h-full flex items-center justify-center">
          {index + 1}
        </div>
      )}
      <div
        onClick={handleOnClick}
        onBlur={handleOnBlur}
        className="py-auto pl-4 flex items-center min-h-[28px] w-full border-l break-words break-all"
      >
        {clicked && !sorting ? (
          <span className="my-auto flex w-full">
            <input
              type="text"
              value={name}
              ref={inputTrickRef}
              onChange={handleUpdateTrick}
              onBlur={applyUpdatingTrick}
              className="w-full focus:border-b underline-offset-4 cursor-pointer focus:outline-none"
            />
          </span>
        ) : (
          name
        )}
      </div>
      {sorting || (
        <button
          onClick={handleDeleteTrick}
          className="w-8 p-[1px] my-auto mr-[1.5px] h-full text-xs flex items-center justify-center hover:bg-gray-200 rounded-full"
        >
          削除
        </button>
      )}
    </div>
  );
};

export default TrickElem;
