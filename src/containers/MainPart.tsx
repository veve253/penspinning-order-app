import TrickForm from "../components/TrickForm";
import useTrick from "../hooks/useTrick";
import FS from "./FS";

const MainPart = () => {
  const { trickList, addTrick, removeTrick, updateTrick } = useTrick();
  return (
    <main className="pb-6">
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
