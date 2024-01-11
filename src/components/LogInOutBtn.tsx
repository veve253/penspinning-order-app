import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { useAuthContext } from "../contexts/AuthContexts";
import { useEffect, useState } from "react";

const LoginBtn = () => {
  const { user } = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    if (isBlurred) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isBlurred]);

  const signInWithGoogle = async () => {
    const result = await signInWithRedirect(auth, provider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <>
      <button
        onClick={user ? () => setIsOpen((prev) => !prev) : signInWithGoogle}
        onBlur={() => setIsBlurred(true)}
        onFocus={() => setIsBlurred(false)}
        className={` ${
          user
            ? "rounded-full"
            : "py-1 px-2 rounded-md hover:bg-sky-500 bg-sky-200 hover:text-white"
        }  cursor-pointer `}
      >
        {user ? (
          // ログイン済みの場合…ユーザーアイコン
          <div>
            <img className="rounded-full h-[32px]" src={user?.photoURL || ""} />
          </div>
        ) : (
          // 非ログイン時…ログインボタン
          "ログイン"
        )}
      </button>
      {isOpen && user && (
        // ログアウトボタン
        <div className="absolute flex z-10 flex-col origin-top-right right-0 w-[80px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <button
            onClick={handleSignOut}
            className="text-sm py-1 text-gray-700 hover:bg-slate-300 hover:text-sky-600 border-b"
          >
            ログアウト
          </button>
        </div>
      )}
    </>
  );
};

export default LoginBtn;
