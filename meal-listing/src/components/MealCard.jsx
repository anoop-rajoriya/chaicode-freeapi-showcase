import React from "react";

function MealCard({ meal }) {
  const tags = meal.strTags ? meal.strTags.split(",") : [];
  return (
    <div className="flex flex-col bg-neutral-800 rounded-xl overflow-hidden border border-neutral-700 shadow-sm hover:shadow-md hover:border-neutral-500 transition-all duration-200">
      <div className="relative h-48 overflow-hidden bg-neutral-900">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-neutral-100 mb-1 line-clamp-1">
          {meal.strMeal}
        </h3>

        <div className="flex items-center justify-between text-sm text-neutral-400 mb-4">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              ></path>
            </svg>
            {meal.strCategory}
          </span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            {meal.strArea}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-neutral-700/50 border border-neutral-600 text-xs rounded-md text-neutral-300"
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealCard;
