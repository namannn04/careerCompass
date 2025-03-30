// pages/admin/careers.jsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getCareers, addCareer, updateCareer, deleteCareer } from "../../lib/firebase";

export default function CareersAdminPage() {
  const router = useRouter();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Check authentication
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        // Redirect to login if not authenticated
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch careers
  useEffect(() => {
    async function fetchCareers() {
      try {
        const careersData = await getCareers();
        setCareers(careersData);
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    }

    if (authenticated) {
      fetchCareers();
    }
  }, [authenticated]);

  // Handle add career
  const handleAddCareer = async (careerData) => {
    try {
      setLoading(true);
      await addCareer(careerData);
      
      // Refresh the careers list
      const careersData = await getCareers();
      setCareers(careersData);
    } catch (error) {
      console.error("Error adding career:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle update career
  const handleUpdateCareer = async (id, careerData) => {
    try {
      setLoading(true);
      await updateCareer(id, careerData);
      
      // Refresh the careers list
      const careersData = await getCareers();
      setCareers(careersData);
    } catch (error) {
      console.error("Error updating career:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle delete career
  const handleDeleteCareer = async (id) => {
    if (window.confirm("Are you sure you want to delete this career?")) {
      try {
        setLoading(true);
        await deleteCareer(id);
        
        // Refresh the careers list
        const careersData = await getCareers();
        setCareers(careersData);
      } catch (error) {
        console.error("Error deleting career:", error);
        alert("Failed to delete career. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && !careers.length) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <CareersDashboard
          careers={careers}
          loading={loading}
          addCareer={handleAddCareer}
          updateCareer={handleUpdateCareer}
          deleteCareer={handleDeleteCareer}
        />
      </div>
    </div>
  );
}