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
    age: "",
    country: "",
    city: "",
    bio: "",
    institute: "",
    pursuing: "",
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
      <div className="min-h-screen bg-transparent flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-xl border border-[#fcb326] overflow-hidden">
          {/* Profile Header */}
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10">
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 flex items-center justify-center shadow-lg border-4 border-[#fcb326]">
              <span className="text-5xl font-extrabold text-gray-200">
                {profileData.displayName
                  ? profileData.displayName[0].toUpperCase()
                  : "P"}
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold">
              {profileData.displayName || "Your Name"}
            </h2>
            <p className="text-md italic text-gray-300 mt-1">
              {profileData.bio || "Bio: Not provided"}
            </p>
          </div>

          {/* Profile Details Section */}
          <div className="p-8 space-y-8 bg-gray-400">
            {error && (
              <p className="text-red-500 text-center font-medium">{error}</p>
            )}

            {/* Editable Fields */}
            {isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Name", name: "displayName", type: "text" },
                  { label: "Bio", name: "bio", type: "textarea", rows: 3 },
                  { label: "Phone", name: "phone", type: "number" },
                  { label: "Age", name: "age", type: "number" },
                  { label: "Country", name: "country", type: "text" },
                  { label: "City", name: "city", type: "text" },
                  {
                    label: "College/School Name",
                    name: "institute",
                    type: "text",
                  },
                  { label: "Pursuing", name: "pursuing", type: "text" },
                ].map(({ label, name, type, rows }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        name={name}
                        value={profileData[name]}
                        onChange={handleInputChange}
                        rows={rows}
                        className="w-full mt-2 p-3 border border-[#fcb326] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-[#fcb326] text-gray-800 outline-none"
                      />
                    ) : (
                      <input
                        type={type}
                        name={name}
                        value={profileData[name]}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-3 border border-[#fcb326] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-[#fcb326] text-gray-800 outline-none"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Phone", value: profileData.phone },
                  { label: "Age", value: profileData.age },
                  { label: "Country", value: profileData.country },
                  { label: "City", value: profileData.city },
                  {
                    label: "College/School Name",
                    value: profileData.institute,
                  },
                  { label: "Pursuing", value: profileData.pursuing },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 bg-white shadow-md rounded-lg border border-[#fcb326]"
                  >
                    <h4 className="text-sm font-medium text-gray-600">
                      {label}
                    </h4>
                    <p className="text-gray-800 mt-2 text-base">
                      {value || "Not provided"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition-transform transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-transform transform hover:scale-105"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-transform transform hover:scale-105"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105"
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
