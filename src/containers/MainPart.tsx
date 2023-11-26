import TrickForm from "../components/TrickForm";
import useTrick from "../hooks/useTrick";
import FS from "./FS";

const MainPart = () => {
  const { trickList, addTrick } = useTrick();
  return (
    <main className="pb-6">
      <TrickForm addTrick={addTrick} />
      <FS trickList={trickList} />
    </main>
  );
};

export default MainPart;
