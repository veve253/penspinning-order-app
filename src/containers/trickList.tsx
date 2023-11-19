import { useAuthContext } from "../contexts/AuthContexts";

const TrickList = () => {
  const { user, loading, error } = useAuthContext();
  const userinf = error ? `${error}` : loading ? "ローディング" : `${user}`;
  console.log(userinf);

  return (
    <div>
      trickList
      <p></p>
    </div>
  );
};

export default TrickList;
