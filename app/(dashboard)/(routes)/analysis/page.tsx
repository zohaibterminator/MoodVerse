"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function Analysis() {
  type Analysis = {
    id: string;
    entry_id: string;
    analysis: string;
    time: string;
    // Other properties...
  };

  const [prevAnalysis, setPrevAnalysis] = useState<Analysis[]>([]);

  useEffect(() => {
    const fetchPrevAnalysis = async () => {
      try {
        const res = await axios.get("/api/analysis");
        setPrevAnalysis(res.data);
      } catch (error) {
        console.error("Error fetching analysis entries:", error);
      }
    };

    fetchPrevAnalysis();
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-3xl my-6 font-semibold text-purple-700">
        Your Analysis
      </h1>
      <div className="flex flex-wrap -mx-4">
        {prevAnalysis.map((entry) => (
          <div
            key={entry.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 px-4 mb-4"
          >
            <Card className="w-full bg-white rounded-md shadow-md p-4">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-purple-700">
                  {new Date(entry.time).toLocaleDateString()}
                </CardTitle>
                <div className="text-gray-500 text-sm">
                  {new Date(entry.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </CardHeader>
              <CardDescription className="text-gray-700 mt-2">
                {/* Display the analysis text */}
                {entry.analysis}
              </CardDescription>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analysis;
