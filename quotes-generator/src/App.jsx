import React, { useState, useEffect, useCallback } from "react";

import LoadingScreen from "./components/LoadingScreen.jsx";
import ErrorScreen from "./components/ErrorScreen.jsx";
import Header from "./components/Header.jsx";
import QuoteCard from "./components/QuoteCard.jsx";
import NavigationControls from "./components/NavigationControls.jsx";

import { getQuotes } from "./utils/service.js";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState(new Set());

  // 1. Define the missing generateRandomQuote function
  const generateRandomQuote = useCallback((availableQuotes) => {
    if (!availableQuotes || availableQuotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const newQuoteId = availableQuotes[randomIndex].id;

    setHistory((prev) => [...prev, newQuoteId]);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getQuotes();

        // 2. Prevent a crash if the service returns an array on failure
        if (Array.isArray(response) && response.length === 0) {
          throw new Error("Failed to fetch quotes. API returned an error.");
        }

        const fetchedQuotes = response.data.data;
        setQuotes(fetchedQuotes);

        // 3. Generate the first quote automatically so the screen isn't blank
        if (fetchedQuotes.length > 0) {
          generateRandomQuote(fetchedQuotes);
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [generateRandomQuote]);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Pass the current state quotes to the function
      generateRandomQuote(quotes);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const newFavs = new Set(prev);
      newFavs.has(id) ? newFavs.delete(id) : newFavs.add(id);
      return newFavs;
    });
  };

  const activeQuoteId = history[currentIndex];
  const activeQuote = quotes.find((q) => q.id === activeQuoteId);
  const isFavorite = favorites.has(activeQuoteId);
  const canGoBack = currentIndex > 0;

  if (loading && quotes.length === 0) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 py-12 px-4 flex flex-col items-center justify-center selection:bg-zinc-700">
      <Header viewCount={history.length} favoriteCount={favorites.size} />

      <div className="max-w-2xl w-full relative">
        <QuoteCard
          quote={activeQuote}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
        />

        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoBack={canGoBack}
        />
      </div>
    </div>
  );
}
