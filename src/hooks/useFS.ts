import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../utils/firebase";
import { useAuthContext } from "../contexts/AuthContexts";
import { FSMenuType } from "../types/FSType";

const useFS = () => {
  const [FSs, setFSs] = useState<FSMenuType>([]);
  const { user } = useAuthContext();

  // 全FSの読み込み
  const readFSs = async () => {
    if (user) {
      const FSCollectionRef = collection(db, "FSs");
      const q = query(
        FSCollectionRef,
        where("userId", "==", user.uid),
        orderBy("index")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newFS: FSMenuType = snapshot.docs.map((doc) => ({
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

  return { FSs, setFSs, readFSs };
};

export default useFS;
