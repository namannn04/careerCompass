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
        <div className="max-w-4xl w-full bg-gray-400 shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-4xl font-bold">
                {profileData.displayName
                  ? profileData.displayName[0].toUpperCase()
                  : "?"}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">
              {profileData.displayName || "Your Name"}
            </h2>
            <p className="text-sm italic text-gray-300">
              {profileData.bio || "Bio: Not provided"}
            </p>
          </div>

          {/* Profile Details Section */}
          <div className="p-8 space-y-6">
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            {/* Editable Fields */}
            {isEditing ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg text-gray-900 focus:ring focus:ring-blue-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full mt-1 p-3 border rounded-lg text-gray-900 focus:ring focus:ring-blue-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg text-gray-900 focus:ring focus:ring-blue-300 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-3 border rounded-lg text-gray-900 focus:ring focus:ring-blue-300 outline-none"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg shadow">
                    <h4 className="text-sm font-medium text-gray-600">Phone</h4>
                    <p className="text-gray-800 mt-1">
                      {profileData.phone || "Not provided"}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg shadow">
                    <h4 className="text-sm font-medium text-gray-600">
                      Address
                    </h4>
                    <p className="text-gray-800 mt-1">
                      {profileData.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
