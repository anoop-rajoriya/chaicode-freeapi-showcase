import React from "react";

function QuoteCard({ quote, isFavorite, onToggleFavorite }) {
  if (!quote) return null;

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 p-8 md:p-12 rounded-2xl shadow-2xl transition-all w-full">
      <div className="min-h-[160px] flex flex-col justify-center">
        <p className="text-xl md:text-2xl font-serif leading-relaxed text-zinc-100 mb-6">
          "{quote.content}"
        </p>

        <div className="flex justify-between items-end mt-auto">
          <div>
            <p className="text-zinc-400 font-medium uppercase tracking-wider text-sm">
              — {quote.author}
            </p>

            {quote.tags && quote.tags.length > 0 && (
              <div className="flex gap-2 mt-3">
                {quote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-500 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onToggleFavorite(quote.id)}
            className={`p-2 rounded-full transition-colors ${
              isFavorite
                ? "text-white bg-zinc-700 hover:bg-zinc-600"
                : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
            }`}
            aria-label="Toggle favorite"
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
