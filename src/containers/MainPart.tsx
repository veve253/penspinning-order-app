import FSMenu from "./FSMenu";
import TrickForm from "../components/TrickForm";
import FS from "./FS";
import { Dispatch, FC, SetStateAction } from "react";

const MainPart: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <main className="relative py-8 min-h-screen">
      <FSMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <TrickForm />
      <FS />
    </main>
  );
};

export default MainPart;
