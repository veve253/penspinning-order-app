import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../utils/firebase";
import { useAuthContext } from "../contexts/AuthContexts";
import { FSMenuType, FSType } from "../types/FSType";

const useFS = () => {
  const [FSs, setFSs] = useState<FSMenuType>([]);
  const [selectedFS, setSelectedFS] = useState([]);
  const [targetFS, setTargetFS] = useState<FSType>();
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

      if (!targetFS) {
        console.log(FSs);

        setTargetFS(FSs[0]);
      }
      console.log(targetFS);

      // メモリリークを防ぐ？
      return () => {
        unsubscribe();
      };
    }
  };

  const handleSetTargetFS = (id: string) => {
    if (!targetFS) {
      console.log(FSs);

      setTargetFS(FSs[0]);
    } else if (id) {
      console.log(id);

      const newTargetFS = FSs.find((FS) => {
        return FS.id === id;
      });
      setTargetFS(newTargetFS);
    }
    console.log(targetFS);
  };

  // 特定のFSの読み込み
  const readFS = (id: string) => {
    if (id) {
      const FSDocRef = doc(db, "FSs", id);
      const FSCollectionRef = collection(FSDocRef, "FS");

      const q = query(FSCollectionRef, orderBy("index"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newFS: any = snapshot.docs.map((doc) => doc.data());
        setSelectedFS(newFS);
      });

      // メモリリークを防ぐ？
      return () => {
        unsubscribe();
      };
    }
  };

  return {
    FSs,
    setFSs,
    readFSs,
    readFS,
    selectedFS,
    targetFS,
    handleSetTargetFS,
  };
};

export default useFS;
