import { createContext, useContext } from "react";
import { FSMenuType, FSType } from "../types/FSType";
import useFS from "../hooks/useFS";

const FSContext = createContext<{
  FSs: FSMenuType | [];
  readFSs: any;
  setFSs: any;
  selectedFS: any;
  setSelectedFS: any;
  targetFS: FSType | undefined;
  handleSetTargetFS: any;
  readFS: any;
  addFS: any;
  deleteFS: any;
  renameFS: any;
  addTrick: any;
  deleteTrick: any;
  renameTrick: any;
  updateTrickIndex: any;
}>({
  FSs: [],
  readFSs: null,
  setFSs: null,
  selectedFS: null,
  setSelectedFS: null,
  targetFS: undefined,
  handleSetTargetFS: null,
  readFS: null,
  addFS: null,
  deleteFS: null,
  renameFS: null,
  addTrick: null,
  deleteTrick: null,
  renameTrick: null,
  updateTrickIndex: null,
});

export const FSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    FSs,
    readFSs,
    setFSs,
    selectedFS,
    setSelectedFS,
    targetFS,
    handleSetTargetFS,
    readFS,
    addFS,
    deleteFS,
    renameFS,
    addTrick,
    deleteTrick,
    renameTrick,
    updateTrickIndex,
  } = useFS();

  return (
    <FSContext.Provider
      value={{
        FSs,
        readFSs,
        setFSs,
        selectedFS,
        setSelectedFS,
        targetFS,
        handleSetTargetFS,
        readFS,
        addFS,
        deleteFS,
        renameFS,
        addTrick,
        deleteTrick,
        renameTrick,
        updateTrickIndex,
      }}
    >
      {children}
    </FSContext.Provider>
  );
};

export const useFSContext = () => useContext(FSContext);
