import { useAuthContext } from "../contexts/AuthContexts";
import "./FS.css";
import Trick from "../components/Trick";

const tricks = ["4ソニック", "3ソニックひねり", "122sp"];

const TrickList = () => {
  const { user, loading, error } = useAuthContext();
  const userinf = error ? `${error}` : loading ? "ローディング" : `${user}`;
  console.log(userinf);

  return (
    <div className="mt-6">
      {tricks.map((trick, index) => {
        return (
          <div key={index}>
            <Trick name={trick} index={index} />
            <div className="text-center">
              <div className="px-auto inline-block align-middle text-gray-400 leading-none w-4 h-4 my-2 border border-current border-l-0 border-b-0 box-border custom-chevron"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrickList;
