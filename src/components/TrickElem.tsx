import { FC, useState } from "react";

const TrickElem: FC<{
  index: number;
  name: string;
}> = ({ index, name }) => {
  // const newTrick = useState(name);

  const handleUpdateTrick = () =>
    // event: React.ChangeEvent<HTMLInputElement>
    {
      // newTrick && updateTrick(trickIndex, event.target.value);
    };

  return (
    <div className="flex justify-between border mx-auto text-xs w-4/5 min-h-[32px] rounded-full">
      <div className="w-6 my-auto h-full  flex items-center justify-center">
        {index + 1}
      </div>
      <div className="py-auto pl-4 flex items-center min-h-[32px] w-full border-r border-l">
        <span className="my-auto hover:border-b cursor-pointer min-w-min">
          <input
            type="text"
            value={name}
            onChange={handleUpdateTrick}
            className="w-full"
          />
        </span>
      </div>
      <button className="w-8 my-auto h-full text-[10px] flex items-center justify-center hover:bg-red-300 rounded-r-full">
        削除
      </button>
    </div>
  );
};

export default TrickElem;
