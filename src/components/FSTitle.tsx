import React, { useEffect, useRef, useState } from "react";
import { useFSContext } from "../contexts/FSContexts";

const FSTitle = () => {
  const { targetFS, handleSetTargetFS, renameFS, FSs } = useFSContext();
  const [FSName, setFSName] = useState(targetFS?.name);

  useEffect(() => {
    setFSName(targetFS?.name);
  }, [targetFS]);

  // FSMenuから名前が変更されたときに、それを反映
  useEffect(() => {
    handleSetTargetFS(targetFS?.id);
  }, [FSs]);

  const [clicked, setClicked] = useState(false);

  const inputFSRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clicked ? inputFSRef.current?.focus() : inputFSRef.current?.blur();
  }, [clicked]);

  const handleSetFSName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFSName(event.target.value);
  };

  const applyNewFSName = (event: React.ChangeEvent<HTMLInputElement>) => {
    renameFS(targetFS?.id, event.target.value);
  };

  return (
    <div>
      <h2
        className="text-center text-xl mb-3"
        onClick={() => setClicked(true)}
        onBlur={() => setClicked(false)}
      >
        {clicked ? (
          <input
            type="text"
            value={
              FSName !== undefined ? FSName : targetFS ? targetFS.name : ""
            }
            ref={inputFSRef}
            onChange={handleSetFSName}
            onBlur={applyNewFSName}
            className="text-center focus:border-b underline-offset-4 cursor-pointer focus:outline-none"
          />
        ) : FSName !== undefined ? (
          FSName
        ) : targetFS ? (
          targetFS.name
        ) : (
          ""
        )}
      </h2>
    </div>
  );
};

export default FSTitle;
