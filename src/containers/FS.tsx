import "./FS.css";
import { FC, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TrickElem from "../components/TrickElem";
import { useFSContext } from "../contexts/FSContexts";

import TrickFormBottom from "../components/TrickFormBottom";
import { Trick } from "../types/trickType";
import { FSType } from "../types/FSType";

const FS: FC<{ sorting: boolean }> = ({ sorting }) => {
  const { selectedFS, setSelectedFS } = useFSContext();
  const [clicked, setClicked] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSelectedFS((fs: Trick[]) => {
        const oldIndex = fs.findIndex((trick: Trick) => trick.id === active.id);
        const newIndex = fs.findIndex((trick: Trick) => trick.id === over.id);
        const newSelectedFS = arrayMove(fs, oldIndex, newIndex);
        const toAddTricks = newSelectedFS.map((trick: any, num: number) => {
          return { ...trick, index: num };
        });
        return toAddTricks;
      });
    }
  };
  console.log(selectedFS);

  return (
    <div className="mt-6">
      {sorting ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedFS}
            strategy={verticalListSortingStrategy}
          >
            {selectedFS.map((trick: Trick, index: number) => {
              return (
                <div key={trick.id}>
                  <TrickElem
                    id={trick.id}
                    name={trick.trick}
                    index={index}
                    sorting={sorting}
                  />
                  {index !== selectedFS.length - 1 && (
                    <div className="text-center">
                      <div className="px-auto inline-block align-middle text-gray-400 leading-none w-2 h-2 mb-[1px] border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
      ) : (
        <>
          {selectedFS.map((trick: Trick, index: number) => {
            return (
              <div key={trick.id}>
                <TrickElem
                  id={trick.id}
                  name={trick.trick}
                  index={index}
                  sorting={sorting}
                />
                {index !== selectedFS.length - 1 && (
                  <div className="text-center">
                    <div className="px-auto inline-block align-middle text-gray-400 leading-none w-2 h-2 mb-[1px] border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

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
