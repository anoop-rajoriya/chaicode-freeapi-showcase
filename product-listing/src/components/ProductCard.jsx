import React from "react";
import StarIcon from "./StarIcon.jsx";

const ProductCard = ({ product }) => {
  // Calculate original price before discount
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <div className="group flex flex-col bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden hover:border-neutral-500 transition-colors duration-300">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-neutral-950/80 backdrop-blur-md text-neutral-200 text-xs font-medium px-2.5 py-1 rounded-full border border-neutral-700">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-neutral-400 font-medium mb-1 uppercase tracking-wider">
              {product.brand}
            </p>
            <h3 className="text-lg font-semibold text-neutral-100 leading-tight">
              {product.title}
            </h3>
          </div>
          <div className="flex items-center space-x-1 bg-neutral-900 px-2 py-1 rounded-md border border-neutral-700">
            <span className="text-sm font-medium text-neutral-200">
              {product.rating}
            </span>
            <StarIcon />
          </div>
        </div>

        <p className="text-sm text-neutral-400 mb-6 line-clamp-2">
          {product.description}
        </p>

        {/* Footer/Price Container */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-neutral-100">
                ${product.price}
              </span>
              <span className="text-sm text-neutral-500 line-through">
                ${originalPrice}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              <span className="text-green-500 font-medium">
                {product.stock} in stock
              </span>
            </p>
          </div>

          <button className="bg-neutral-100 hover:bg-white text-neutral-900 text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
