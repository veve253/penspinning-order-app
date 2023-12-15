import "./FS.css";
import TrickElem from "../components/TrickElem";
import { FC } from "react";
import { useFSContext } from "../contexts/FSContexts";

const FS: FC<{
  // trickList: Trick[];
  // removeTrick: (index: number) => void;
  // updateTrick: (index: number, newTrick: string) => void;
}> = () => {
  const { selectedFS } = useFSContext();
  return (
    <div className="mt-6">
      {selectedFS.map((trick: any, index: any) => {
        return (
          <div key={index}>
            <TrickElem
              name={trick.trick}
              index={index}
              // trickIndex={trick.index}
              // removeTrick={removeTrick}
              // updateTrick={updateTrick}
            />
            {index !== selectedFS.length - 1 && (
              <div className="text-center">
                <div className="px-auto inline-block align-middle text-gray-400 leading-none w-2 h-2 mb-[1px] border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FS;
