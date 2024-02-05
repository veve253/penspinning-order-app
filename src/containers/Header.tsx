import LogInOutBtn from "../components/LogInOutBtn";
import Hamburger from "../components/Hamburger";
import { Dispatch, FC, SetStateAction } from "react";
import { useAuthContext } from "../contexts/AuthContexts";

const Header: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user, loading } = useAuthContext();
  return (
    <header>
      <div className="border-b py-3 flex items-center">
        {user && <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />}

        <h1
          className={`flex-grow flex-shrink w-4/6 ${
            !user && "pl-8"
          } text-center lg:text-left lg:pl-32 text-2xl font-bold`}
        >
          ペン回し練習室
        </h1>
        <div className="flex-grow flex-shrink w-2/6 lg:text-right lg:pr-10 text-center">
          {!loading && <LogInOutBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
