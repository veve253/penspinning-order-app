import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
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
        const newFS: any = snapshot.docs.map((doc) => ({
          id: doc.id,
          index: doc.data().index,
          trick: doc.data().trick,
        }));
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
  const addTrick = async (trick: string) => {
    const index = selectedFS[selectedFS.length - 1]
      ? selectedFS[selectedFS.length - 1].index + 1
      : 1;
    const newTrick: { index: number; trick: string } = {
      index,
      trick,
    };

    if (targetFS) {
      const FSDocRef = doc(db, "FSs", targetFS.id);
      const FSCollectionRef = collection(FSDocRef, "FS");
      await addDoc(FSCollectionRef, newTrick);
      readFS(targetFS.id);
    }
  };

  const deleteTrick = async (id: string) => {
    if (targetFS) {
      const trickDocRef = doc(db, "FSs", targetFS.id, "FS", id);
      await deleteDoc(trickDocRef);
      readFS(targetFS.id);
    }
  };

  const updateTrick = async (id: string, newTrick: string) => {
    if (targetFS) {
      const trickDocRef = doc(db, "FSs", targetFS.id, "FS", id);
      await updateDoc(trickDocRef, {
        trick: newTrick,
      });
      readFS(targetFS.id);
    }
  };

  return {
    FSs,
    setFSs,
    readFSs,
    readFS,
    selectedFS,
    setSelectedFS,
    targetFS,
    handleSetTargetFS,
    addTrick,
    deleteTrick,
    updateTrick,
  };
};

export default useFS;
