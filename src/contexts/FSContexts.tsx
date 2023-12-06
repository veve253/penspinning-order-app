import { createContext, useContext } from "react";
import { FSMenuType, FSType } from "../types/FSType";
import useFS from "../hooks/useFS";

const FSContext = createContext<{
  FSs: FSMenuType | [];
  readFSs: any;
  setFSs: any;
  selectedFS: any;
  targetFS: FSType | undefined;
  handleSetTargetFS: any;
  readFS: any;
}>({
  FSs: [],
  readFSs: null,
  setFSs: null,
  selectedFS: null,
  targetFS: undefined,
  handleSetTargetFS: null,
  readFS: null,
});

export const FSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    FSs,
    readFSs,
    setFSs,
    selectedFS,
    targetFS,
    handleSetTargetFS,
    readFS,
  } = useFS();

  return (
    <FSContext.Provider
      value={{
        FSs,
        readFSs,
        setFSs,
        selectedFS,
        targetFS,
        handleSetTargetFS,
        readFS,
      }}
    >
      {children}
    </FSContext.Provider>
  );
};

export const useFSContext = () => useContext(FSContext);
