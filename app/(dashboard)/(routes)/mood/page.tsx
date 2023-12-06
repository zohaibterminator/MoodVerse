"use client";
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useRouter } from "next/navigation";
Chart.register(...registerables);
import { useState, useEffect } from "react";
import axios from "axios";
const currentDate = new Date();

// Format date as "Mon, DD MMM"
const formattedDate = currentDate.toLocaleDateString("en-US", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

// Define an array of days of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Find the index of the current day
const currentDayIndex = currentDate.getDay();

// Calculate the shift needed to make the current day appear in the middle
const shift = currentDayIndex - Math.floor(daysOfWeek.length / 2);

// Shift the days array to make the current day in the middle
const shiftedDays = [...daysOfWeek.slice(shift), ...daysOfWeek.slice(0, shift)];

const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

function Mood() {
  // Get current date

  const router = useRouter();
  type moodtype = {
    id: string;
    mood: string;
    Note: string;
    intensity: string;
    location: string;
    weather: string;
    time:string;
    analysis?: {
      recommendation: {
        id: string;
        recommendations: string;
        time: string;
      };
    };
    // Other properties...
  };
  const [mood, setmood] = useState<moodtype[]>([]);
  const [expandedRecommendationId, setExpandedRecommendationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchmood = async () => {
      try {
        const res = await axios.get("/api/mood");
        setmood(res.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchmood();
  }, []);
  const moodCounts = mood.reduce(
    (acc, entry) => {
      const lowercaseMood = entry.mood.toLowerCase() as
        | "happy"
        | "sad"
        | "excited"
        | "neutral"
        | "angry"
        | "anxious";
      acc[lowercaseMood] = (acc[lowercaseMood] || 0) + 1;
      return acc;
    },
    { happy: 0, sad: 0, excited: 0, neutral: 0, angry: 0, anxious: 0 }
  );

  const updatedDoughnutData = {
    labels: ["Happy", "Sad", "Excited", "Neutral", "Angry", "Anxious"],
    datasets: [
      {
        data: [
          moodCounts.happy,
          moodCounts.sad,
          moodCounts.excited,
          moodCounts.neutral,
          moodCounts.angry,
          moodCounts.anxious,
        ],
        backgroundColor: [
          "#FFD700",
          "#4169E1",
          "#00FF00",
          "#A9A9A9",
          "#FF0000",
          "#692544",
        ],
        borderColor: "white",
        borderWidth: 5,
      },
    ],
  };
  return (
    <div className="text-center mt-5 mx-10">
      {/* Existing content */}
      <div className="flex justify-between items-center">
        <div className="text-purple-900 text-2xl font-medium">
          <span className="mr-1">Hey,</span>
          <span className="font-bold">Alexa!👋</span>
        </div>
        <div className="flex justify-end">
          <button
            className="text-white text-lg font-medium bg-purple-900 p-4 mr-3 rounded-full shadow-md"
            onClick={() => router.push(`/mood/addmood`)}
          >
            Add Mood +
          </button>
          <div className="text-purple-900 text-lg font-medium bg-gray-100 p-4 rounded-full shadow-md">
            {formattedDate}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-7 mx-2">
        {shiftedDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`text-stone-950 text-sm ${
                index === Math.floor(daysOfWeek.length / 2)
                  ? "font-bold"
                  : "opacity-70"
              } shadow-md bg-white rounded-3xl p-5`}
            >
              {day}
              <div className="text-xs mt-1">
                {currentDate.getDate() +
                  index -
                  Math.floor(daysOfWeek.length / 2)}
              </div>
            </div>
            <div className="bg-gray-100 h-6 w-6 mt-2 rounded-full"></div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-between">
        <div className=" bg-white rounded-3xl px-3 py-4 w-1/4">
          <h2 className="text-2xl text-purple-900 font-medium mb-4">
            Mood Summary
          </h2>
          <Doughnut className="pb-2" data={updatedDoughnutData} />
        </div>
        <div className="ml-6 bg-white rounded-3xl px-3 py-4 w-3/4">
          <h2 className="text-2xl text-purple-900 font-medium mb-4">
            Calendar
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {daysOfMonth.map((day) => (
              <div
                key={day}
                className="text-center py-2 bg-gray-100 rounded-full"
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-2xl flex justify-start text-purple-900 font-medium mt-10">
        Your History
      </h2>
      <div className="flex flex-wrap mt-3.5">
      {mood.map((entry) => (
          <div key={entry.id} className="w-full sm:w-1/2 p-4">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex justify-between mb-2">
                <div>
                <span className="text-gray-700 text-opacity-70">You felt</span>
                <span className="font-bold ps-1">{entry.mood}</span>
                </div>
                <div className="flex justify-end mt-2 text-xs text-gray-500">
                {new Date(entry.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              </div>
              <div className="flex justify-between mb-2">
                <div>
                  <span className="text-gray-700 text-opacity-70">
                    Your location
                  </span>
                  <span className="font-bold ps-1">{entry.location}</span>
                </div>
                <div className="text-xs text-gray-700 text-opacity-70">
                  {entry.weather}
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                <span className="font-bold">Note:</span> {entry.Note}
              </div>
              <div className="flex justify-start text-violet-500 text-sm font-medium mb-2">
                <span
                  className="cursor-pointer underline"
                  onClick={() => router.push(`/mood/addmood`)}
                >
                  Edit
                </span>
              </div>
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpandedRecommendationId(entry.id)}>
                <div className="font-bold text-lg text-gray-800">
                  Recommendation
                </div>
                <div className="text-yellow-500 text-sm font-medium">Tip</div>
              </div>
              {expandedRecommendationId === entry.id && (
                <div className="text-sm text-gray-700 mt-2">
                  <span className="font-bold">Recommendation:</span>{" "}
                  {entry.analysis?.recommendation.recommendations}
                </div>
              )}
            </div>
          </div>
        ))}
</div>

    </div>
  );
}

export default Mood;
