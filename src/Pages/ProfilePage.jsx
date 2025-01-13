import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  authStateListener,
  signOut,
  getUserProfile,
  updateUserProfile,
} from "../../backend/authService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    displayName: "",
    phone: "",
    address: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStateListener(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profile = await getUserProfile();
          setProfileData((prev) => ({
            ...prev,
            ...profile,
          }));
        } catch (error) {
          console.error("Error fetching profile data:", error.message);
          setError("Unable to fetch profile data. Please try again.");
        }
      } else {
        setAlert(
          <div className="flex items-center justify-center min-h-screen bg-transparent">
            <div className="bg-yellow-300 text-yellow-800 mb-40 p-6 rounded-md text-center shadow-lg">
              <p className="text-lg font-medium mb-4">
                Please sign in to view your profile.
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        );
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      await updateUserProfile(profileData);
      setIsEditing(false);
      console.log("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error.message);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log("User signed out successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      setError("Failed to sign out. Please try again.");
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        {alert && (
          <div className="text-yellow-800 p-4 rounded-md text-center mb-4">
            {alert}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <Navbar />
      {alert && (
        <div className="bg-yellow-200 text-yellow-800 p-4 rounded-md text-center mb-4">
          {alert}
        </div>
      )}
      <div className="min-h-screen bg-transparent flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
          {error && (
            <p className="text-red-500 text-center font-medium mb-4">{error}</p>
          )}

          <div className="text-center">
            <div
              className="w-24 h-24 mx-auto rounded-full bg-black flex items-center justify-center shadow-md"
            >
              <span className="text-white text-2xl font-bold">
                {profileData.displayName ? profileData.displayName[0] : "?"}
              </span>
            </div>
          </div>

          <div className="mt-8 text-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="displayName"
                  value={profileData.displayName}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none text-xl font-bold text-gray-800"
                />
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Your Bio"
                  className="w-full mt-4 text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none text-gray-700"
                  rows="2"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-800">
                  {profileData.displayName || "Your Name"}
                </h2>
                <p className="text-gray-500 italic mt-2">
                  {profileData.bio || "Bio: Not provided"}
                </p>
              </>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700">
              Profile Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                {!isEditing ? (
                  <p className="text-gray-700 mt-1">
                    {profileData.phone || "Not provided"}
                  </p>
                ) : (
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded text-black"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                {!isEditing ? (
                  <p className="text-gray-700 mt-1">
                    {profileData.address || "Not provided"}
                  </p>
                ) : (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-2 border rounded text-black"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
