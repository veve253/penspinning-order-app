import { useState } from "react";
import { Trick } from "../types/trickType";

const useTrick = () => {
  const [trickList, setTrickList] = useState<Trick[]>([]);

  const addTrick = (trickName: string) => {
    const index = trickList[trickList.length - 1]
      ? trickList[trickList.length - 1].index + 1
      : 1;
    const newTrick: Trick = {
      index,
      trick: trickName,
    };

    setTrickList((prevTrickList) => [...prevTrickList, newTrick]);
  };

  const removeTrick = (index: number) => {
    const newTrickList = trickList.filter((trick) => {
      return trick.index != index;
    });

    setTrickList(newTrickList);
  };

  const updateTrick = (index: number, newTrick: string) => {
    const newTrickList: Trick[] = [...trickList];
    const targetTrick: Trick | undefined = newTrickList.find(
      (trick) => trick.index === index
    );
    targetTrick && (targetTrick.trick = newTrick);
    setTrickList(newTrickList);
  };

  return { trickList, setTrickList, addTrick, removeTrick, updateTrick };
};

export default useTrick;
