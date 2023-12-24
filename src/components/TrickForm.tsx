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
        className="border-b p-1 mr-2 w-[250px] focus:outline-none focus:border-sky-600"
        placeholder="技を入力"
        ref={trickRef}
      />
      <button
        type="submit"
        className="bg-sky-400 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded-full"
      >
        追加
      </button>
    </form>
  );
};

export default TrickForm;
