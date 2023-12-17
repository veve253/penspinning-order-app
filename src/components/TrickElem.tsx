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
    <div className="flex justify-between border mx-auto text-xs w-4/5 min-h-[32px] rounded-xl">
      <div className="w-6 my-auto h-full  flex items-center justify-center">
        {index + 1}
      </div>
      <div className="py-auto pl-4 flex items-center min-h-[32px] w-full  border-l">
        <span className="my-auto  w-full">
          <input
            type="text"
            value={name}
            onChange={handleUpdateTrick}
            className="w-full hover:underline underline-offset-4 cursor-pointer focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          />
        </span>
      </div>
      <button className="w-8 p-[1px] my-auto mr-[1.5px] h-full text-[10px] flex items-center justify-center hover:bg-gray-200 rounded-full">
        削除
      </button>
    </div>
  );
};

export default TrickElem;
