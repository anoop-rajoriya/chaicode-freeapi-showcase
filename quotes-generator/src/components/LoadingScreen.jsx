import React from "react";

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="animate-pulse text-zinc-500 font-medium tracking-widest uppercase">
        Consulting the archives...
      </div>
    </div>
  );
}

export default LoadingScreen;
