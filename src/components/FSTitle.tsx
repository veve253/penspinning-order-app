import React from "react";
import { useFSContext } from "../contexts/FSContexts";

const FSTitle = () => {
  const { targetFS } = useFSContext();
  console.log(targetFS);

  return (
    <div>
      <h2 className="text-center text-xl mb-3">{targetFS?.name}</h2>
    </div>
  );
};

export default FSTitle;
