import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { WishlistContext } from "../../Context/WishlistContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, updateWishlistItemQuantity } = useContext(WishlistContext);

  const handleIncrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item.quantity < 100) {
      updateWishlistItemQuantity(productName, item.quantity + 1);
    }
  };

  const handleDecrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item.quantity > 1) {
      updateWishlistItemQuantity(productName, item.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="space-y-6">
            {wishlist.map((item, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col space-y-4">
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer"
                />
                <h3 className="text-lg font-medium text-gray-800">{item.productName}</h3>
                <div className="transition-all duration-300 overflow-hidden" style={{ maxHeight: "40px" }}>
                  <p className="text-xs text-gray-600">{item.productDescription}</p>
                </div>
                <div className="flex gap-2 items-center mt-2 text-yellow-500 text-xs">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <FaStar
                        key={i}
                        className="w-4 h-4 cursor-pointer"
                        color={(item.ratingOutOfFive || 0) >= ratingValue ? "#FFD700" : "#A0AEC0"}
                      />
                    );
                  })}
                  <span className="text-gray-600 ml-2">({item.customerReviewScore} Reviews)</span>
                </div>
                <div className="flex flex-col items-start mt-2 text-sm space-y-1">
                  <span className={`${item.stockQuantity > 0 ? "text-green-500" : "text-red-500"} text-lg`}>
                    <span className="text-black text-xs">Stock:</span> {item.stockQuantity}
                  </span>
                  <span className="text-blue-500">
                    <span className="text-black text-xs">Brand:</span> {item.brandName}
                  </span>
                  <span className="font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-lg shadow-md">
                    Total: ${item.quantity * item.priceInUSD}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3 text-xs">
                  <button
                    onClick={() => handleDecrease(item.productName)}
                    className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm disabled:opacity-50"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-black rounded-lg shadow-sm">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.productName)}
                    className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-sm"
                    disabled={item.quantity >= item.stockQuantity}
                  >
                    +
                  </button>
                </div>
                {item.availableSizes && (
                  <div className="relative w-full mt-2">
                    <button
                      className="bg-gray-300 px-2 py-2 w-full rounded-lg text-gray-800 font-medium border border-gray-400 shadow-sm"
                    >
                      {item.selectedSize ? `Size: ${item.selectedSize}` : "Select Size"}
                    </button>
                  </div>
                )}
                <div className="flex flex-col items-center mt-2 space-y-2">
                  <button
                    onClick={() => alert(`${item.quantity} item(s) purchased successfully!`)}
                    className={`w-full px-3 py-2 text-white rounded-lg transition shadow-md ${
                      item.stockQuantity > 0 ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={item.stockQuantity <= 0}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.productName)}
                    className="w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove from Wishlist
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
