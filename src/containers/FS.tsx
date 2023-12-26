import "./FS.css";
import TrickElem from "../components/TrickElem";
import { useFSContext } from "../contexts/FSContexts";
import { useState } from "react";
import TrickFormBottom from "../components/TrickFormBottom";

const FS = () => {
  const { selectedFS } = useFSContext();
  const [clicked, setClicked] = useState(false);
  return (
    <div className="mt-6">
      {selectedFS.map((trick: any, index: any) => {
        return (
          <div key={index}>
            <TrickElem id={trick.id} name={trick.trick} index={index} />
            {index !== selectedFS.length - 1 && (
              <div className="text-center">
                <div className="px-auto inline-block align-middle text-gray-400 leading-none w-2 h-2 mb-[1px] border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
              </div>
            )}
          </div>
        );
      })}

      {clicked && <TrickFormBottom setClicked={setClicked} />}
      <div className="text-center">
        <button
          onClick={() => setClicked((prev) => !prev)}
          className="my-2 rounded-full text-gray-300 cursor-pointer"
        >
          {clicked ? <div className="text-center">閉じる</div> : "＋"}
        </button>
      </div>
    </div>
  );
};

export default FS;
