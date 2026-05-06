import React, { useState, useEffect, useCallback } from "react";

import LoadingScreen from "./components/LoadingScreen.jsx";
import ErrorScreen from "./components/ErrorScreen.jsx";
import Header from "./components/Header.jsx";
import QuoteCard from "./components/QuoteCard.jsx";
import NavigationControls from "./components/NavigationControls.jsx";

import { getQuotes } from "./utils/service.js";

export default function App() {
  const [quotes, setQuotes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchQuotes = async () => {
      setStatus("loading");
      try {
        const { data } = await getQuotes();
        setQuotes(data.data);
        setStatus("success");
        generateRandomQuote(mockApiData);
      } catch (err) {
        setStatus("error");
      }
    };

    fetchQuotes();
  }, []);

  const generateRandomQuote = useCallback(
    (quoteList = quotes) => {
      if (quoteList.length === 0) return;

      let randomIndex;
      const currentQuoteId = history[currentIndex];

      do {
        randomIndex = Math.floor(Math.random() * quoteList.length);
      } while (
        quoteList.length > 1 &&
        quoteList[randomIndex].id === currentQuoteId
      );

      const newQuoteId = quoteList[randomIndex].id;
      const newHistory = [...history.slice(0, currentIndex + 1), newQuoteId];

      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    },
    [quotes, history, currentIndex],
  );

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      generateRandomQuote();
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

  if (status === "loading") return <LoadingScreen />;
  if (status === "error") return <ErrorScreen />;

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
