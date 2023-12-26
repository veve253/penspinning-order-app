import FSMenu from "./FSMenu";
import TrickForm from "../components/TrickForm";
import FS from "./FS";
import { Dispatch, FC, SetStateAction } from "react";
import FSTitle from "../components/FSTitle";

const MainPart: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <main className="relative py-8 min-h-screen">
      <FSMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="lg:absolute lg:left-[450px] xl:static">
        <FSTitle />
        <TrickForm />
        <FS />
      </div>
    </main>
  );
};

export default MainPart;
