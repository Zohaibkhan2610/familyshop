import React, { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { WishlistContext } from "../../Context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, updateWishlistItemQuantity } = useContext(WishlistContext);

  // Local States for Image Handling
  const [showFullImage, setShowFullImage] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Local States for Description Toggle
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Local States for Rating Hover Effect
  const [hoverRating, setHoverRating] = useState(null);

  // Handle Quantity Increase
  const handleIncrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item && item.quantity < 100) {
      updateWishlistItemQuantity(productName, item.quantity + 1);
    }
  };

  // Handle Quantity Decrease
  const handleDecrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item && item.quantity > 1) {
      updateWishlistItemQuantity(productName, item.quantity - 1);
    }
  };

  // Placeholder for Purchase Logic
  const handlePurchase = (productName) => {
    console.log(`Purchasing ${productName}...`);
    // Replace this with actual purchase logic (e.g., redirect to checkout)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-6">
          {wishlist.map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-lg rounded-2xl p-4 w-[310px] h-fit border border-gray-300 flex flex-col relative overflow-hidden"
            >
              {/* Image */}
              {product.imageUrl && (
                <>
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-xl shadow-md cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowFullImage(true);
                    }}
                  />
                  {showFullImage && selectedProduct?.productId === product.productId && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                      onClick={() => setShowFullImage(false)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        className="max-w-full max-h-full rounded-xl"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Product Details */}
              <div className="text-gray-700 flex flex-col justify-center mt-2 text-sm">
                <h2 className="text-lg font-bold w-[300px] text-center text-gray-900">
                  {product.productName}
                </h2>
                <div
                  className={`transition-all duration-300 ${
                    showFullDescription ? "overflow-y-auto" : "overflow-hidden"
                  }`}
                  style={{ maxHeight: showFullDescription ? "200px" : "40px" }}
                >
                  <p className="text-xs text-gray-600">{product.productDescription}</p>
                </div>
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 text-xs font-medium mt-1 hover:text-blue-800"
                >
                  {showFullDescription ? "Show Less" : "Read More"}
                </button>
              </div>

              {/* Rating */}
              <div className="flex gap-2 items-center mt-2 text-yellow-500 text-xs">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <FaStar
                      key={i}
                      className="w-4 h-4 cursor-pointer"
                      color={
                        (hoverRating || product.ratingOutOfFive) >= ratingValue
                          ? "#FFD700"
                          : "#A0AEC0"
                      }
                      onMouseEnter={() => setHoverRating(ratingValue)}
                      onMouseLeave={() => setHoverRating(null)}
                    />
                  );
                })}
                <span className="text-gray-600 ml-2 w-[100px]">
                  ({product.customerReviewScore} Reviews)
                </span>
              </div>

              {/* Stock, Brand & Price */}
              <p className="text-gray-800 font-semibold mt-1 text-sm flex items-center justify-between">
                <span
                  className={`${
                    product.stockQuantity > 0 ? "text-green-500" : "text-red-500"
                  } text-lg`}
                >
                  <span className="text-black text-xs">Stock:</span>{" "}
                  {product.stockQuantity}
                </span>
                <span className="text-blue-500">
                  <span className="text-black text-xs">Brand:</span>{" "}
                  {product.brandName}
                </span>
                <span className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-lg shadow-md">
                  ${product.priceInUSD * product.quantity}
                </span>
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center w-[80px] justify-center mt-2 space-x-3 text-xs">
                <button
                  onClick={() => handleDecrease(product.productName)}
                  className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm"
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span className="text-black rounded-lg shadow-sm">
                  {product.quantity}
                </span>
                <button
                  onClick={() => handleIncrease(product.productName)}
                  className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm"
                  disabled={product.quantity >= product.stockQuantity}
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-1 text-xs space-x-3">
                <button
                  onClick={() => handlePurchase(product.productName)}
                  className={`w-[90px] px-3 py-2 text-white rounded-lg transition shadow-md ${
                    product.stockQuantity > 0 ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={product.stockQuantity <= 0}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => removeFromWishlist(product.productName)}
                  className="w-[130px] px-3 py-2 text-white rounded-lg transition shadow-md bg-red-600 hover:bg-red-800"
                >
                  Remove Card
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Your wishlist is empty.</p>
      )}
    </div>
  </div>
  );
};

export default WishlistPage;
