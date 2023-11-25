import { FC } from "react";

const Trick: FC<{ index: number; name: string }> = ({ index, name }) => {
  return (
    <div className="flex border mx-auto w-[280px] h-12 rounded-full">
      <div className="w-10 my-auto h-[100%] border-r text-center flex items-center justify-center">
        {index + 1}
      </div>
      <div className="my-auto pl-4 ">
        <p className="my-auto border-b">{name}</p>
      </div>
    </div>
  );
};

export default Trick;
