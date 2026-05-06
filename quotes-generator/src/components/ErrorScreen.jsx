import React from "react";

function ErrorScreen({ error }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-400">
      Failed to load wisdom. Please try again.
    </div>
  );
}

export default ErrorScreen;
