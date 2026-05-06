import React, { useEffect, useState } from "react";

const initialCatData = {
  name: "Aegean",
  origin: "Greece",
  description:
    "Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.",
  image: "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg",
};

const fetchCat = async () => {
  const response = await fetch(
    "https://api.freeapi.app/api/v1/public/cats/cat/random",
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return { data: data.data, message: data.message };
};

export default function RandomCatViewer() {
  const [catData, setCatData] = useState(initialCatData);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNewCat = async () => {
    setIsLoading(true);

    try {
      const { data } = await fetchCat();
      setCatData({
        name: data.name,
        origin: data.origin,
        description: data.description,
        temperament: data.temperament,
        image: data.image,
      });
    } catch (error) {
      console.error("Failed to fetch cat data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans text-neutral-200">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl overflow-hidden transition-all">
        {/* Header Section */}
        <div className="p-5 border-b border-neutral-800 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-neutral-100 tracking-wide">
            Feline Finder
          </h1>
          <span className="text-xs font-medium px-2.5 py-1 bg-neutral-800 text-neutral-400 rounded-full">
            {catData.origin}
          </span>
        </div>

        {/* Image Section */}
        <div className="relative aspect-4/3 bg-neutral-950 overflow-hidden group">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 animate-pulse">
              <span className="text-neutral-500 font-medium tracking-widest uppercase text-sm">
                Loading...
              </span>
            </div>
          ) : (
            <img
              src={catData.image}
              alt={`${catData.name} cat`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-50 mb-1">
              {catData.name}
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed italic">
              {catData.temperament}
            </p>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            {catData.description}
          </p>
        </div>

        {/* Action Section */}
        <div className="p-5 bg-neutral-950/50 border-t border-neutral-800">
          <button
            onClick={fetchNewCat}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-neutral-100 hover:bg-white text-neutral-900 font-semibold rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-neutral-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Fetch Another Cat"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
