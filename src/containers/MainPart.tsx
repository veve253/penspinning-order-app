import FSMenu from "./FSMenu";
import TrickForm from "../components/TrickForm";
import FS from "./FS";
import { Dispatch, FC, SetStateAction, useState } from "react";
import FSTitle from "../components/FSTitle";
import { useAuthContext } from "../contexts/AuthContexts";

const MainPart: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const [sorting, setSorting] = useState(false);
  const { user, loading } = useAuthContext();
  return (
    <main className="relative py-8 min-h-screen">
      {loading ? (
        // ログイン途中の場合
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl">
          Loading...
        </div>
      ) : (
        <>
          {user && <FSMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
          <div
            className={`w-[320px] md:w-[450px] mx-auto ${
              user && "lg:absolute lg:left-[450px] xl:static"
            }`}
          >
            <FSTitle sorting={sorting} setSorting={setSorting} />
            <TrickForm />
            <FS sorting={sorting} />
          </div>
        </>
      )}
    </main>
  );
};

export default MainPart;
