import React, { useState, useRef, useEffect, useCallback } from "react";

const ItemCard = ({
  imageUrl,
  productName,
  productDescription,
  initialStockQuantity,
  isAvailable,
  brandName,
  priceInUSD,
  availableSizes,
  ratingOutOfFive,
  customerReviewScore,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(initialStockQuantity);
  const [quantity, setQuantity] = useState(1);
  const dropdownRef = useRef(null);

  const toggleDescription = useCallback(() => {
    setShowFullDescription((prev) => !prev);
  }, []);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleIncrease = () => {
    if (quantity < stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePurchase = () => {
    if (stockQuantity >= quantity) {
      setStockQuantity(stockQuantity - quantity);
      setQuantity(1);
      alert(`${quantity} item(s) purchased successfully!`);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 max-w-sm border border-gray-200 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 h-[600px] flex flex-col relative overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-40 object-cover rounded-xl shadow-md"
        />
      )}
      <h2 className="text-xl font-bold text-gray-900 mt-4 tracking-wide">
        {productName}
      </h2>
      <div className="text-gray-600 mt-2 flex-grow overflow-hidden">
        <p className={`line-clamp-${showFullDescription ? "unset" : "3"}`}>
          {productDescription}
        </p>
        <button
          onClick={toggleDescription}
          className="text-blue-600 underline mt-1 font-medium transition hover:text-blue-800"
          aria-label="Toggle description"
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </div>

      {/* Stock Display */}
      <p className="text-gray-800 font-semibold mt-2">
        <span
          className={`text-${
            stockQuantity > 0 ? "green" : "red"
          }-500 font-medium`}
        >
          Stock: <span className="font-bold">{stockQuantity}</span>{" "}
          {stockQuantity > 0 ? "(In Stock)" : "(Out of Stock)"}
        </span>{" "}
        | <span className="text-blue-500 font-medium">Brand: {brandName}</span>
      </p>

      <p className="text-lg font-bold mt-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 inline-block rounded-lg shadow-md">
        ${priceInUSD}
      </p>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center mt-3 space-x-3">
        <button
          onClick={handleDecrease}
          className="bg-gray-300 px-3 py-2 rounded-lg text-gray-800 font-bold shadow-sm hover:bg-gray-400"
        >
          −
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-gray-300 px-3 py-2 rounded-lg text-gray-800 font-bold shadow-sm hover:bg-gray-400"
          disabled={quantity >= stockQuantity}
        >
          +
        </button>
      </div>

      {/* Buttons and Size Selector in One Line */}
      <div className="flex justify-between items-center mt-3 relative space-x-2">
        <div ref={dropdownRef} className="relative w-1/3 h-10">
          <button
            onClick={toggleDropdown}
            className="bg-gray-300 px-4 py-2 rounded-lg w-full text-gray-800 font-medium border border-gray-400 shadow-sm transition hover:bg-gray-400 text-center truncate"
            aria-haspopup="listbox"
          >
            {selectedSize ? `Size: ${selectedSize}` : "Select Size"}
          </button>
          {dropdownOpen && (
            <ul className="flex absolute w-[300px] scroll-auto bg-white border border-gray-300 rounded-lg -mt-25 shadow-lg z-10 max-h-40 overflow-auto transition-opacity duration-200 ease-in-out">
              {availableSizes.map((size) => (
                <li
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 font-medium transition text-center"
                  role="option"
                >
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handlePurchase}
          className={`px-4 py-2 text-white rounded-lg transition w-1/3 h-10 font-semibold shadow-md ${
            stockQuantity > 0
              ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={stockQuantity <= 0}
        >
          Buy Now
        </button>
        <button
          className={`px-4 py-2 text-white rounded-lg transition w-1/3 h-10 font-semibold shadow-md ${
            stockQuantity > 0
              ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={stockQuantity <= 0}
        >
          Add to Cart
        </button>
      </div>

      <p className="text-gray-600 text-center mt-3 text-sm font-medium">
        Rating: {ratingOutOfFive} ⭐ ({customerReviewScore} Reviews)
      </p>
    </div>
  );
};

export default ItemCard;
