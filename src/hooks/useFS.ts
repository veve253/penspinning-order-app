import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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
        orderBy("index", "desc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newFS: FSMenuType = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          index: doc.data().index,
        }));
        console.log("onSnapshot");

        setFSs(newFS);
      });

      // メモリリークを防ぐ？
      return () => {
        unsubscribe();
      };
    }
  };

  // 読み込む対象のFSを設定
  const handleSetTargetFS = (id?: string, isFirst?: boolean) => {
    if (id) {
      const newTargetFS = FSs.find((FS) => {
        return FS.id === id;
      });
      setTargetFS(newTargetFS);
    } else if (!targetFS || isFirst) {
      setTargetFS(FSs[0]);
    }
    console.log(targetFS);
  };

  // 特定のFSの読み込み
  const readFS = async (id: string) => {
    if (id) {
      const FSDocRef = doc(db, "FSs", id);
      const FSCollectionRef = collection(FSDocRef, "FS");

      const q = query(FSCollectionRef, orderBy("index"));

      const querySnapshot = await getDocs(q);

      const newFS = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        index: doc.data().index,
        trick: doc.data().trick,
      }));
      console.log("snap");

      setSelectedFS(newFS);
    }
  };

  const addFS = async () => {
    if (user) {
      const FSCollectionRef = collection(db, "FSs");
      await addDoc(FSCollectionRef, {
        index: FSs[0].index + 1,
        name: "無題",
        userId: user.uid,
      });
    }
  };

  const deleteFS = async (id: string) => {
    const FSDocRef = doc(db, "FSs", id);
    const FSCollectionRef = collection(FSDocRef, "FS");
    const FSCollection = await getDocs(FSCollectionRef);

    const deleteSubCollection = FSCollection.docs.map((FSElem) => {
      deleteDoc(FSElem.ref);
    });

    await Promise.all(deleteSubCollection);

    await deleteDoc(FSDocRef);
  };

  const renameFS = async (id: string, newName: string) => {
    const trickDocRef = doc(db, "FSs", id);
    await updateDoc(trickDocRef, {
      name: newName,
    });
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
    addFS,
    deleteFS,
    renameFS,
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
