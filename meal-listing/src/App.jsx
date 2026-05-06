import React, { useState, useEffect } from "react";

import MealCard from "./components/MealCard";
import Pagination from "./components/Pagination";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPageItems, setCurrentPageItems] = useState(0);

  useEffect(() => {
    async function fetchMeals() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/meals?page=${page}`,
        );
        const data = await response.json();

        if (!response.ok) {
          setMeals([]);
        }

        setMeals(data.data.data);
        setTotalPages(data.data.totalPages);
        setTotalItems(data.data.totalItems);
        setCurrentPageItems(data.data.currentPageItems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, [page]);

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100 mb-3">
            Discover Meals
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Browse through our curated collection of global recipes, from hearty
            mains to delicate desserts.
          </p>
        </header>

        {!loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {meals.map((meal) => (
                <MealCard key={meal.idMeal} meal={meal} />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={totalItems}
              currentPageItems={currentPageItems}
              onNext={() => setPage((pre) => pre + 1)}
              onPrevious={() => setPage((pre) => pre - 1)}
            />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center py-20 w-full h-full min-h-[300px]">
            {/* Spinning Circle */}
            <div className="w-12 h-12 rounded-full border-4 border-neutral-800 border-t-neutral-300 animate-spin mb-4"></div>

            {/* Loading Text */}
            <p className="text-neutral-400 text-sm font-medium animate-pulse">
              Loading meals...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
