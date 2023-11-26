import "./FS.css";
import TrickElem from "../components/TrickElem";
import { Trick } from "../types/trickType";
import { FC } from "react";

const FS: FC<{ trickList: Trick[] }> = ({ trickList }) => {
  return (
    <div className="mt-6">
      {trickList.map((trick, index) => {
        return (
          <div key={index}>
            <TrickElem name={trick.trick} index={index} />
            {index !== trickList.length - 1 && (
              <div className="text-center">
                <div className="px-auto inline-block align-middle text-gray-400 leading-none w-4 h-4 my-2 border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FS;
