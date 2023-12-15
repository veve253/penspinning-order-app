import {
  addDoc,
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
import { Trick } from "../types/trickType";

const useFS = () => {
  const [FSs, setFSs] = useState<FSMenuType>([]);
  const [selectedFS, setSelectedFS] = useState<any>([]);
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

  // 読み込む対象のFSを設定
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
        console.log(newFS);

        setSelectedFS(newFS);
      });

      // メモリリークを防ぐ？
      return () => {
        unsubscribe();
      };
    }
  };

  // FSに技を追加
  const addTrick = (trick: string) => {
    const index = selectedFS[selectedFS.length - 1]
      ? selectedFS[selectedFS.length - 1].index + 1
      : 1;
    const newTrick: Trick = {
      index,
      trick,
    };

    if (targetFS) {
      const FSDocRef = doc(db, "FSs", targetFS.id);
      const FSCollectionRef = collection(FSDocRef, "FS");
      addDoc(FSCollectionRef, newTrick);
    }

    setSelectedFS((prevSelectedFS: any) => [...prevSelectedFS, newTrick]);
  };

  return {
    FSs,
    setFSs,
    readFSs,
    readFS,
    selectedFS,
    targetFS,
    handleSetTargetFS,
    addTrick,
  };
};

export default useFS;
