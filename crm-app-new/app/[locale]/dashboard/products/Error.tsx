"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <h2 className="text-2xl font-semibold text-red-600">Something went wrong 😢</h2>
      <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}
