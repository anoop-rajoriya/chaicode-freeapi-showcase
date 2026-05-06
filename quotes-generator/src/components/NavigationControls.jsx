import React from "react";

function NavigationControls({ onPrevious, onNext, canGoBack }) {
  return (
    <div className="flex gap-4 mt-8 justify-center">
      <button
        onClick={onPrevious}
        disabled={!canGoBack}
        className="px-6 py-3 rounded-xl font-medium transition-colors border border-zinc-800 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white"
      >
        ← Previous
      </button>

      <button
        onClick={onNext}
        className="px-8 py-3 rounded-xl font-medium transition-all shadow-lg shadow-zinc-900/50
                 bg-zinc-100 text-zinc-950 hover:bg-white hover:scale-105 active:scale-95"
      >
        Generate Next →
      </button>
    </div>
  );
}

export default NavigationControls;
