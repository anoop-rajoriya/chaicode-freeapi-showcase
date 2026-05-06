import React, { useState, useEffect } from "react";

import JokeCard from "./components/JokeCard.jsx";
import JokeSkeleton from "./components/JokeSkeleton.jsx";

// Initializing with the provided JSON data structure
const initialData = {
  page: 1,
  limit: 10,
  totalPages: 147,
  previousPage: false,
  nextPage: true,
  totalItems: 1465,
  currentPageItems: 10,
  data: [
    {
      categories: [],
      id: 1,
      content:
        "Chuck Norris invented the bolt-action rifle, liquor, sexual intercourse, and football-- in that order.",
    },
    {
      categories: ["explicit"],
      id: 2,
      content:
        "The Chuck Norris facts game is played out... And we should all stop contributing to this stupid shit! Unless your a dickless gamer that dwells on this Chuck Norris nonsense",
    },
    {
      categories: ["explicit"],
      id: 3,
      content:
        "Chuck Norris can make love to 500 women a day, while destroying all of the cock block ninjas that get in his way.",
    },
    {
      categories: ["explicit"],
      id: 4,
      content:
        'Horses have long faces because they keep challenging Chuck Norris to "whos got the biggest dick" contests.',
    },
    {
      categories: ["explicit"],
      id: 5,
      content:
        'Every-so-often Chuck Norris will cut a hole into a cement block and proceed to fuck it because he really enjoys "rough sex".',
    },
    {
      categories: ["explicit"],
      id: 6,
      content:
        "Chuck Norris has to asexually reproduce due to the fact no woman would survive in bed with him.",
    },
    {
      categories: ["explicit"],
      id: 7,
      content:
        "Other than having experienced an actual sexual encounter with Chuck Norris, the only thing that can possibly match & satisfy women is a mail order device aptly called an Anal Intruder which exhibits a Roto Rooter twirling action.",
    },
    {
      categories: ["explicit"],
      id: 8,
      content:
        "Chuck Norris answers the question of his metrosexuality by simply reaching his hand down the front of your pants and popping your balls like grapes.",
    },
    {
      categories: ["explicit"],
      id: 9,
      content:
        "Once, after chugging a gallon of Captain Morgan Rum, Chuck Norris french kissed a transexual frog. Nine month later, Chaz Bono was born.",
    },
    {
      categories: ["explicit"],
      id: 10,
      content:
        "Chuck Norris is all for same-sex marriage, as long as both chicks are hot.",
    },
  ],
};

const getJokesService = async (page = 1, limit = 10) => {
  const response = await fetch(
    `https://api.freeapi.app/api/v1/public/randomjokes?page=${page}&limit=${limit}`,
  );

  const data = await response.json();

  if (!response.ok) return [];

  return { data: data.data, message: data.message };
};

export default function JokesViewer() {
  const [jokesResponse, setJokesResponse] = useState(initialData);
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageItems, setCurrentPageItems] = useState(0);

  useEffect(() => {
    async function fetchJokes() {
      try {
        setLoading(true);
        const { data, message } = await getJokesService(currentPage);

        setJokes(data.data);
        setTotalItems(data.totalItems);
        setTotalPages(data.totalPages);
        setCurrentPageItems(data.currentPageItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchJokes();
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-4 md:p-8 font-sans selection:bg-neutral-700 selection:text-neutral-50">
      <div className="max-w-5xl mx-auto space-y-8 flex flex-col h-full">
        {/* Header */}
        <header className="text-center py-8 border-b border-neutral-800">
          <h1 className="text-3xl md:text-5xl font-extrabold text-neutral-100 mb-3 tracking-tight">
            The Chuck Norris Archive
          </h1>
          <p className="text-neutral-400 text-sm md:text-base font-medium">
            Page {currentPage} of {totalPages} • {totalItems} total jokes
          </p>
        </header>

        {/* Jokes Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {loading
              ? Array.from({ length: currentPageItems }).map((_, index) => (
                  <JokeSkeleton key={`skeleton-${index}`} />
                ))
              : jokes.map((joke) => <JokeCard key={joke.id} joke={joke} />)}
          </div>
        </main>

        {/* Pagination Controls */}
        <footer className="py-8 border-t border-neutral-800">
          <div className="flex justify-between items-center max-w-md mx-auto gap-4">
            <button
              onClick={() => setCurrentPage((pre) => pre - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-300 font-medium hover:bg-neutral-800 hover:text-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            >
              Previous
            </button>

            <span className="text-neutral-500 text-sm font-semibold tracking-wider uppercase">
              {currentPageItems} items / page
            </span>

            <button
              onClick={() => setCurrentPage((pre) => pre + 1)}
              disabled={currentPage >= totalPages}
              className="px-6 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-300 font-medium hover:bg-neutral-800 hover:text-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-600"
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
