import React from "react";

function JokeCard({ joke }) {
  return (
    <div className="group bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between h-full">
      {/* Joke Content */}
      <div className="mb-6">
        <p className="text-neutral-200 text-lg md:text-xl leading-relaxed font-medium group-hover:text-neutral-50 transition-colors">
          "{joke.content}"
        </p>
      </div>

      {/* Meta Footer */}
      <div className="flex justify-between items-end mt-auto pt-4 border-t border-neutral-800/50">
        {/* Joke ID Tag */}
        <span className="inline-flex items-center justify-center bg-neutral-950 border border-neutral-800 text-neutral-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
          ID: {joke.id}
        </span>

        {/* Categories */}
        {joke.categories && joke.categories.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-end">
            {joke.categories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center justify-center bg-neutral-800 text-neutral-300 text-xs font-semibold px-2.5 py-1.5 rounded-md capitalize"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeCard;
