import FSMenu from "./FSMenu";
import TrickForm from "../components/TrickForm";
import useTrick from "../hooks/useTrick";
import FS from "./FS";

const MainPart = ({ isOpen, setIsOpen }) => {
  const { trickList, addTrick, removeTrick, updateTrick } = useTrick();
  return (
    <main className="relative py-8 min-h-screen">
      <FSMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <TrickForm addTrick={addTrick} />
      <FS
        trickList={trickList}
        removeTrick={removeTrick}
        updateTrick={updateTrick}
      />
    </main>
  );
};

export default MainPart;
