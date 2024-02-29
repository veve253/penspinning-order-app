import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
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

      setSelectedFS(newFS);
    }
  };

  const addFS = async (name?: string) => {
    if (user) {
      const FSCollectionRef = collection(db, "FSs");
      await addDoc(FSCollectionRef, {
        index: FSs[0].index + 1,
        name: name ? name : "無題",
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
    if (targetFS) {
      // 新しいtrickを定義
      const index = selectedFS[selectedFS.length - 1]
        ? selectedFS[selectedFS.length - 1].index + 1
        : 0;
      const newTrick: { index: number; trick: string } = {
        index,
        trick,
      };

      // dbへ追加
      const FSCollectionRef = collection(db, "FSs", targetFS.id, "FS");
      await addDoc(FSCollectionRef, newTrick);

      // 追加したtrickを読み込み
      const q = query(FSCollectionRef, orderBy("index", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      setSelectedFS((prev: Trick[]) => {
        const newTrick = {
          id: querySnapshot.docs[0].id,
          index: querySnapshot.docs[0].data().index,
          trick: querySnapshot.docs[0].data().trick,
        };
        return [...prev, newTrick];
      });
    }
  };

  const deleteTrick = async (id: string) => {
    if (targetFS) {
      // フロント
      setSelectedFS((prev: Trick[]) => {
        const newFS = prev.filter((trick: Trick) => trick.id !== id);
        return newFS;
      });
      // dbへの反映
      const trickDocRef = doc(db, "FSs", targetFS.id, "FS", id);
      deleteDoc(trickDocRef);
    }
  };

  const renameTrick = async (id: string, newTrick: string) => {
    if (targetFS) {
      // フロント
      setSelectedFS((prev: Trick[]) => {
        const newFS = prev.map((trick: Trick) => {
          if (trick.id === id) {
            return { ...trick, trick: newTrick };
          } else {
            return trick;
          }
        });
        return newFS;
      });
      // dbへの反映
      const trickDocRef = doc(db, "FSs", targetFS.id, "FS", id);
      updateDoc(trickDocRef, {
        trick: newTrick,
      });
    }
  };

  const updateTrickIndex = async () => {
    if (targetFS) {
      // dbに対して複数の書き込みを行うため、batch処理を用いる
      const batch = writeBatch(db);
      selectedFS.forEach((trick: Trick, index: number) => {
        const trickDocRef = doc(db, "FSs", targetFS.id, "FS", trick.id);
        batch.update(trickDocRef, { index });
      });
      await batch.commit();
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
    renameTrick,
    updateTrickIndex,
  };
};

export default useFS;
