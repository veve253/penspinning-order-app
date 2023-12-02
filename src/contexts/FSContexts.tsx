import { createContext, useContext } from "react";
import { FSMenuType } from "../types/FSType";
import useFS from "../hooks/useFS";

const FSContext = createContext<{
  FSs: FSMenuType | [];
  readFSs: any;
  setFSs: any;
}>({
  FSs: [],
  readFSs: null,
  setFSs: null,
});

export const FSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { FSs, readFSs, setFSs } = useFS();

  return (
    <FSContext.Provider value={{ FSs, readFSs, setFSs }}>
      {children}
    </FSContext.Provider>
  );
};

export const useFSContext = () => useContext(FSContext);
