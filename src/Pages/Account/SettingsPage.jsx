import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext"; 
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// Country-Currency Mapping
const countryCurrencyMap = {
  "Egypt": "EGP",
  "USA": "USD",
  "India": "INR",
  "Germany": "EUR",
  "United Kingdom": "GBP",
  "Canada": "CAD",
  "Australia": "AUD",
  "Japan": "JPY",
  "China": "CNY",
  "Brazil": "BRL",
  "South Africa": "ZAR",
  // Add more countries and their currencies as needed
};

const SettingsPage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state for editable fields
  const [address, setAddress] = useState(user?.address || "");
  const [country, setCountry] = useState(user?.country || "Egypt");
  const [currency, setCurrency] = useState(user?.currency || "EGP");
  const [language, setLanguage] = useState(user?.language || "English");

  // Automatically update currency when country changes
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);

    // Update currency based on the selected country
    const updatedCurrency = countryCurrencyMap[selectedCountry];
    setCurrency(updatedCurrency);
  };

  // Save changes to the profile
  const saveSettings = () => {
    const updatedSettings = {
      address,
      country,
      currency,
      language,
    };

    // Update the user profile in context
    updateUserProfile(updatedSettings);

    // Notify the user of success
    toast.success("Settings updated successfully!");

    // Navigate back to the profile page
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>

        {/* Address Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Country Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Country</label>
          <select
            value={country}
            onChange={handleCountryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            {Object.keys(countryCurrencyMap).map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            {Object.values(countryCurrencyMap).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {currencyCode}
              </option>
            ))}
          </select>
        </div>

        {/* Language Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
          >
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        {/* Save Button */}
        <button
          onClick={saveSettings}
          className="w-full py-3 px-6 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;