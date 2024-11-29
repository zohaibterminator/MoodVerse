"use client"
import { useState, useEffect } from "react";
import axios from "axios";

import toast from "react-hot-toast";

function Recommendation() {
  type RecommendationType = {
    id: string;
    recommendations: string;
    time: string;
    // Other properties...
  };

  const [prevRecommendation, setPrevRecommendation] = useState<RecommendationType[]>([]);

  useEffect(() => {
    const fetchPrevRecommendation = async () => {
      try {
        const res = await axios.get("/api/recommendation");
        setPrevRecommendation(res.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchPrevRecommendation();
  }, []);

  const handleRate = async (recommendationId: string, rating: number) => {
    try {
      // Send the rating to the server/API route
      await axios.post("/api/rating", {
        recommendationId,
        rating,
      });
      toast.success("Success");
      // Optionally, you can update the local state or navigate to another page
      // based on the API response or other conditions
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
<div className="mt-8">
  <h1 className="text-3xl my-6 font-semibold text-purple-700">
    Your Recommendations
  </h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {prevRecommendation.map((entry) => (
      <div key={entry.id} className="mb-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-700">
              {new Date(entry.time).toLocaleDateString()}
            </div>
            <div className="text-gray-500 text-sm">
              {new Date(entry.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="text-gray-800 mb-4">{entry.recommendations}</div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className="cursor-pointer text-xl text-yellow-500"
                onClick={() => handleRate(entry.id, index)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Recommendation;
