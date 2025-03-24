import React, { createContext, useState } from 'react';
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Function to add an item to the wishlist
  const addToWishlist = (item) => {
    const isAlreadyInWishlist = wishlist.some((wishlistItem) => wishlistItem.productName === item.productName);

    if (!isAlreadyInWishlist) {
      setWishlist((prevWishlist) => [...prevWishlist, item]);
      toast.success(`${item.productName} added to wishlist!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.info(`${item.productName} is already in your wishlist.`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Function to update the quantity of an item in the wishlist
  const updateWishlistItemQuantity = (productName, newQuantity) => {
    setWishlist((prevWishlist) =>
      prevWishlist.map((item) =>
        item.productName === productName ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (productName) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.productName !== productName)
    );
    toast.success(`${productName} removed from wishlist.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Function to handle purchasing an item from the wishlist
  const purchaseFromWishlist = (productName, quantityToBuy, updateStock) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.map((item) => {
        if (item.productName === productName) {
          const remainingQuantity = item.quantity - quantityToBuy;
          if (remainingQuantity > 0) {
            return { ...item, quantity: remainingQuantity };
          } else {
            toast.success(`You have purchased all ${quantityToBuy} units of ${productName}.`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            return null; // Remove the item from the wishlist
          }
        }
        return item;
      }).filter(Boolean); // Filter out null values

      return updatedWishlist;
    });

    // Update the global stock
    updateStock(productName, quantityToBuy);
    toast.success(`You have successfully purchased ${quantityToBuy} units of ${productName}.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, updateWishlistItemQuantity, removeFromWishlist, purchaseFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};