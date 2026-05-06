import React from "react";

function Header({ viewCount, favoriteCount }) {
  return (
    <div className="max-w-2xl w-full mb-8 flex justify-between items-end border-b border-zinc-800 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Wisdom Generator
      </h1>
      <div className="text-zinc-500 text-sm flex gap-4">
        <span>Viewed: {viewCount}</span>
        <span>Favorites: {favoriteCount}</span>
      </div>
    </div>
  );
}

export default Header;
