import React from "react";
import { useState, useEffect } from "react";

import ProductCard from "./components/ProductCard";
import Loader from "./components/Loader.jsx";
import { getProducts } from "./utils/services.js";

const limit = 10;

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPageItems, setCurrentPageItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [previousPage, setPreviousPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts(currentPage, limit)
      .then(({ data, message }) => {
        setProducts(data.data);
        setTotalItems(data.totalItems);
        setCurrentPageItems(data.currentPageItems);
        setCurrentPage(data.page);
        setPreviousPage(data.previousPage);
        setNextPage(data.nextPage);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-100 tracking-tight">
              Featured Products
            </h1>
            <p className="mt-2 text-neutral-400">
              Explore our latest collection of premium tech.
            </p>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-neutral-500">
            Showing {currentPageItems} of {totalItems} items
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <Loader />
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Simple Pagination Footer */}
        <footer className="mt-12 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((pre) => pre - 1)}
            disabled={!previousPage}
            className="px-4 py-2 border border-neutral-700 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((pre) => pre + 1)}
            disabled={!nextPage}
            className="px-4 py-2 border border-neutral-700 rounded-lg text-neutral-200 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </footer>
      </div>
    </div>
  );
}
