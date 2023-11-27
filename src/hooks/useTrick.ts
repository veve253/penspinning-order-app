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
    console.log(index);

    const newTrickList = trickList.filter((trick) => {
      return trick.index != index;
    });

    console.log(newTrickList);

    setTrickList(newTrickList);
  };

  return { trickList, addTrick, removeTrick };
};

export default useTrick;
