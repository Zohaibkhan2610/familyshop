import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router"; 
import { IoArrowForward } from "react-icons/io5";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state for editable fields
  const [name, setName] = useState(user?.name || "");
  const [profilePicture, setProfilePicture] = useState(user?.avatar || null);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Update local state when `user` object changes
  useEffect(() => {
    if (user) {
      setName(user.name || ""); // Sync name with the user object
      setProfilePicture(user.avatar || null); // Sync profile picture with the user object
    }
  }, [user]);

  // Handle profile picture upload
  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Set the base64 image as the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  // Save changes to the profile
  const saveProfileChanges = () => {
    updateUserProfile({ name, avatar: profilePicture });
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        {/* Editable Profile Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {/* Profile Picture Upload */}
            <label htmlFor="profilePicture" className="cursor-pointer border-green-500 rounded-full border-2">
              <div
                className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                style={{
                  backgroundImage: `url(${profilePicture || user?.avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!profilePicture && !user?.avatar && <span className="text-white text-lg">+</span>}
              </div>
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />

            {/* Editable Name */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-xl font-bold text-gray-800 outline-none border-b border-gray-300 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Email and Logout Button */}
          <div className="space-y-2 text-right">
            <p className="text-gray-700"><strong>Email:</strong> {user?.email || "N/A"}</p>
            <button
              onClick={saveProfileChanges}
              className="mt-2 w-full md:w-auto py-2 px-4 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Changes
            </button>
            <button
              onClick={logout}
              className="w-full md:w-auto py-2 px-4 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Wishlist Link */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Wishlist</h2>
          <Link
            to="/wishlist"
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View Wishlist <IoArrowForward className="ml-2" />
          </Link>
        </div>

        {/* Settings Panel */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-700">
              <Link to="/settings" className="hover:text-blue-600">
                Account Settings
              </Link>
              <Link to="/settings">
                <IoArrowForward className="text-blue-500" />
              </Link>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Address</span>
              <span>{user?.address || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Country</span>
              <span>{user?.country || "Egypt"}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Currency</span>
              <span>{user?.currency || "EGP"}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Language</span>
              <span>{user?.language || "English"}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Notification Settings</span>
              <IoArrowForward className="text-gray-500" />
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span>Privacy Policy</span>
              <IoArrowForward className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;