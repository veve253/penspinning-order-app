import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useAuthContext } from "../contexts/AuthContexts";

const LoginBtn = () => {
  const { user } = useAuthContext();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  return (
    <button
      onClick={user ? () => signOut(auth) : signInWithGoogle}
      className="rounded-md py-1 px-2 bg-sky-200 cursor-pointer hover:bg-sky-500 hover:text-white"
    >
      {user ? "ログアウト" : "ログイン"}
    </button>
  );
};

export default LoginBtn;
