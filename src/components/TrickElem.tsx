import { FC, useState } from "react";

const TrickElem: FC<{
  index: number;
  trickIndex: number;
  name: string;
  removeTrick: (index: number) => void;
  updateTrick: (index: number, newTrick: string) => void;
}> = ({ index, trickIndex, name, removeTrick, updateTrick }) => {
  const newTrick = useState(name);

  const handleUpdateTrick = (event: React.ChangeEvent<HTMLInputElement>) => {
    newTrick && updateTrick(trickIndex, event.target.value);
  };

  return (
    <div className="flex justify-between border mx-auto w-[280px] h-12 rounded-full">
      <div className="w-10 my-auto h-[100%] border-r flex items-center justify-center">
        {index + 1}
      </div>
      <div className="my-auto pl-4 w-[100%]">
        <span className="my-auto hover:border-b cursor-pointer">
          <input type="text" value={name} onChange={handleUpdateTrick} />
        </span>
      </div>
      <button
        onClick={() => removeTrick(trickIndex)}
        className="w-10 my-auto h-[100%] border-l text-xs flex items-center justify-center hover:bg-red-300 rounded-r-full"
      >
        削除
      </button>
    </div>
  );
};

export default TrickElem;
