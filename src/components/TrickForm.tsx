import React, { useRef } from "react";
import { useFSContext } from "../contexts/FSContexts";

const TrickForm: React.FC<{
  // addTrick: (trick: string) => void
}> = (
  {
    // addTrick,
  }
) => {
  const trickRef = useRef<HTMLInputElement>(null);
  const { addTrick } = useFSContext();

  const handleAddTrick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trickRef.current) {
      const trick = trickRef.current.value;
      addTrick(trick);
      trickRef.current.value = ""; // フォームをクリア
    }
  };

  return (
    <form onSubmit={handleAddTrick} className="flex justify-center">
      <input
        type="text"
        className="border rounded p-2 mr-2 w-2/3"
        placeholder="技を入力"
        ref={trickRef}
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
