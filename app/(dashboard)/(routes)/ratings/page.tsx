"use client"
import { useState,useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


function Rating() {
    type ratingtype = {
      id: string;
      rating: number;
      time: string;
      recommendation: {
        id: string;
        recommendations: string;
        time: string;
      };
    };
  const [prevratings, setprevratings] = useState<ratingtype[]>([]);

  useEffect(() => {
    const fetchprevratings = async () => {
      try {
        const res = await axios.get("/api/rating");
        setprevratings(res.data);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchprevratings();
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">
        Your Ratings
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {prevratings.map((entry) => (
          <div key={entry.id} className="relative rounded-lg overflow-hidden shadow-md bg-white">
            <div className="p-4">
            <div className="flex justify-between">
              <div className="text-lg font-semibold text-purple-900 mb-2">
                {new Date(entry.time).toLocaleDateString()}
              </div>
              <div className="mt-2 text-gray-600 text-xs">
                {new Date(entry.recommendation.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              </div>
              <p className="text-gray-700 mb-4">
                Rating: {entry.rating}
              </p>
              <p className="text-gray-600">
                Recommendation: {entry.recommendation.recommendations}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rating;