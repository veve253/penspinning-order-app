import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";

const LoginBtn = () => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="rounded-md py-1 px-2 bg-sky-200 cursor-pointer hover:bg-sky-500 hover:text-white"
    >
      ログイン
    </button>
  );
};

export default LoginBtn;
