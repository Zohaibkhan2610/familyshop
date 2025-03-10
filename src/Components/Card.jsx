import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaStar } from "react-icons/fa";

const ItemCard = ({
  imageUrl,
  productName,
  productDescription,
  initialStockQuantity,
  brandName,
  priceInUSD,
  availableSizes,
  customerReviewScore,
  ratingOutOfFive,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [stockQuantity, setStockQuantity] = useState(initialStockQuantity);
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [showFullImage, setShowFullImage] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setStockQuantity(initialStockQuantity);
  }, [initialStockQuantity]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleIncrease = () => {
    if (quantity < stockQuantity) setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handlePurchase = () => {
    if (stockQuantity >= quantity) {
      setStockQuantity((prev) => prev - quantity);
      setQuantity(1);
      alert(`${quantity} item(s) purchased successfully!`);
    }
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-[310px] h-fit border border-gray-300 flex flex-col relative overflow-hidden">
      {/* Image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-48 object-cover rounded-xl shadow-md cursor-pointer"
          onClick={() => setShowFullImage(true)}
        />
      )}

      {showFullImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowFullImage(false)}>
          <img src={imageUrl} alt={productName} className="max-w-full max-h-full rounded-xl" />
        </div>
      )}

      {/* Product Details */}
      <div className="text-gray-700 flex flex-col justify-center mt-2 text-sm">
        <h2 className="text-lg font-bold w-[300px] text-center text-gray-900">{productName}</h2>
        <div className={`transition-all duration-300 ${showFullDescription ? "overflow-y-auto" : "overflow-hidden"}`} style={{ maxHeight: "40px" }}>
          <p className="text-xs text-gray-600">{productDescription}</p>
        </div>
        <button onClick={toggleDescription} className="text-blue-600 text-xs font-medium mt-1 hover:text-blue-800">
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </div>

      {/* Rating */}
      <div className="flex gap-2 items-center mt-2 text-yellow-500 text-xs">
         {/* Quantity Selector */}
      <div className="flex items-center w-[80px] justify-center mt-2 space-x-3 text-xs">
        <button onClick={handleDecrease} className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm">-</button>
        <span className="text-black rounded-lg shadow-sm">{quantity}</span>
        <button onClick={handleIncrease} className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm" disabled={quantity >= stockQuantity}>+</button>
      </div>
       <span className="flex ml-3">
       {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
            <FaStar
              key={i}
              className="w-4 h-4 cursor-pointer"
              color={(hoverRating || userRating || ratingOutOfFive) >= ratingValue ? "#FFD700" : "#A0AEC0"}
              onClick={() => handleRatingClick(ratingValue)}
              onMouseEnter={() => setHoverRating(ratingValue)}
              onMouseLeave={() => setHoverRating(null)}
            />
          );
        })}
       </span>
        <span className="text-gray-600 ml-2 w-[100px]">({customerReviewScore} Reviews)</span>
      </div>

      {/* Stock, Brand & Price */}
      <p className="text-gray-800 font-semibold mt-1 text-sm flex items-center justify-between">
        <span className={`${stockQuantity > 0 ? "text-green-500" : "text-red-500"} text-lg`}> <span className="text-black text-xs">Stock:</span> {stockQuantity}</span>
        <span className="text-blue-500"><span className="text-black text-xs">Brand:</span> {brandName}</span>
        <span className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-lg shadow-md">${priceInUSD}</span>
      </p>

     

      {/* Size Selector & Purchase Buttons */}
      <div className="flex justify-between items-center mt-1 text-xs space-x-3">
        {/* Size Dropdown */}
        <div ref={dropdownRef} className="relative w-[80px]">
          <button onClick={toggleDropdown} className="bg-gray-300 px-2 py-2 w-full rounded-lg text-gray-800 font-medium border border-gray-400 shadow-sm">
            {selectedSize ? `Size: ${selectedSize}` : "Size"}
          </button>
          {dropdownOpen && (
            <ul className="absolute flex w-18 bg-white border border-gray-300 rounded-lg -mt-22 shadow-lg z-10 max-h-40 overflow-auto transition-opacity duration-200">
              {availableSizes.map((size) => (
                <li key={size} onClick={() => { setSelectedSize(size); setDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Buttons */}
        <button onClick={handlePurchase} className={`w-[90px] px-3 py-2 text-white rounded-lg transition shadow-md ${stockQuantity > 0 ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"}`} disabled={stockQuantity <= 0}>
          Buy Now
        </button>
        <button className={`w-[130px] px-3 py-2 text-white rounded-lg transition shadow-md ${stockQuantity > 0 ? "bg-green-600 hover:bg-green-800" : "bg-gray-400 cursor-not-allowed"}`} disabled={stockQuantity <= 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default React.memo(ItemCard);
