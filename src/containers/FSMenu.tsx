import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { useAuthContext } from "../contexts/AuthContexts";

type FSType = {
  id: string;
  name: string;
  index: number;
};

const FSMenu: FC<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const { user } = useAuthContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [FSs, setFSs] = useState<FSType[]>([]);

  useEffect(() => {
    const fetchFSs = async () => {
      if (user) {
        const FSCollectionRef = collection(db, "FSs");
        const q = query(
          FSCollectionRef,
          where("userId", "==", user.uid),
          orderBy("index")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newFS: FSType[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            index: doc.data().index,
          }));
          setFSs(newFS);
        });

        // メモリリークを防ぐ？
        return () => {
          unsubscribe();
        };
      }
    };
    fetchFSs();
  }, [user]);

  return (
    <>
      <div
        className={`absolute inset-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition duration-200 ease-in-out bg-white w-2/3 h-full shadow-md z-10
        overflow-scroll pt-3 flex flex-col`}
      >
        {/* メニュー内容をここに入れる */}
        <div className="flex mx-auto w-[40%] px-4 py-2 justify-center items-center border mt-2 rounded-lg cursor-pointer hover:text-slate-500">
          <span className="pr-2">＋</span>
          <h1>New FS</h1>
        </div>
        <ul className="w-full mt-4">
          {FSs.map((FS) => (
            <li
              className="p-2 border-b cursor-pointer hover:bg-slate-300"
              key={FS.id}
            >
              {FS.name}
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={toggleMenu}
        />
      )}
    </>
  );
};

export default FSMenu;
