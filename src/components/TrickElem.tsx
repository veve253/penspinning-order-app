import { FC } from "react";

const TrickElem: FC<{
  index: number;
  trickIndex: number;
  name: string;
  removeTrick: (index: number) => void;
}> = ({ index, trickIndex, name, removeTrick }) => {
  return (
    <div className="flex justify-between border mx-auto w-[280px] h-12 rounded-full">
      <div className="w-10 my-auto h-[100%] border-r flex items-center justify-center">
        {index + 1}
      </div>
      <div className="my-auto pl-4 w-[100%]">
        <span className="my-auto border-b">{name}</span>
      </div>
      <button
        onClick={() => removeTrick(trickIndex)}
        className="w-10 my-auto h-[100%] border-l text-xs flex items-center justify-center"
      >
        削除
      </button>
    </div>
  );
};

export default TrickElem;
