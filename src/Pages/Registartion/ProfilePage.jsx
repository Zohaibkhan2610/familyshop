import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { WishlistContext } from '../../Context/WishlistContext';
import { useNavigate } from 'react-router';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const { wishlist, removeFromWishlist, updateWishlistItemQuantity } = useContext(WishlistContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  // Handle increasing the quantity
  const handleIncrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item.quantity < 100) { // Optional: Limit maximum quantity
      updateWishlistItemQuantity(productName, item.quantity + 1);
    }
  };

  // Handle decreasing the quantity
  const handleDecrease = (productName) => {
    const item = wishlist.find((item) => item.productName === productName);
    if (item.quantity > 1) {
      updateWishlistItemQuantity(productName, item.quantity - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* User Details */}
        <div className="space-y-2 mb-6">
          <p className="text-gray-700">
            <strong>Name:</strong> {user.name || 'N/A'}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email || 'N/A'}
          </p>
        </div>

        {/* Wishlist */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="space-y-4">
            {wishlist.map((item, index) => (
              <li key={index} className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md">
                {/* Card Header */}
                <div className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <p className="text-gray-800 font-medium">{item.productName}</p>
                    <p className="text-gray-600 text-sm">{item.brandName}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrease(item.productName)}
                      className="bg-gray-300 px-3 py-2 rounded-lg shadow-sm text-black disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-black font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.productName)}
                      className="bg-gray-300 px-3 py-2 rounded-lg shadow-sm text-black"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <p className="text-green-600 font-bold">
                    ${item.quantity * item.priceInUSD}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.productName)}
                  className="mt-2 text-red-500 hover:text-red-700 font-medium self-end"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your wishlist is empty.</p>
        )}

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-6 w-full py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;