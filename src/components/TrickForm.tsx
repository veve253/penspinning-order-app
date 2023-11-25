import React, { useRef } from "react";

const TrickForm: React.FC = () => {
  const trickRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trickRef.current) {
      const trick = trickRef.current.value;
      console.log(trick); // ここでタスクを処理する
      // Firebaseにタスクを追加する処理を記述
      trickRef.current.value = ""; // フォームをクリア
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-8">
      <input
        type="text"
        ref={trickRef}
        className="border rounded p-2 mr-2 w-2/3"
        placeholder="タスクを入力"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        追加
      </button>
    </form>
  );
};

export default TrickForm;
