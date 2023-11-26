"use client";
import * as React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
function Mood() {
  // Get current date
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
  const shiftedDays = [
    ...daysOfWeek.slice(shift),
    ...daysOfWeek.slice(0, shift),
  ];

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Placeholder mood data (replace with actual data)
  const moodData = {
    happy: 3,
    sad: 1,
    excited: 2,
    neutral: 1,
  };

  // Data for the bar chart
  const doughnutData = {
    labels: ["Happy", "Sad", "Excited", "Neutral"],
    datasets: [
      {
        data: [
          moodData.happy,
          moodData.sad,
          moodData.excited,
          moodData.neutral,
        ],
        backgroundColor: ["#FFD700", "#4169E1", "#008000", "#A9A9A9"],
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
        <div className="text-purple-900 text-lg font-medium bg-gray-100 p-4 rounded-full shadow-md">
          {formattedDate}
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
                {currentDate.getDate() + index}
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
          <Doughnut className="pb-2" data={doughnutData} />
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
      <div className="flex justify-between my-5 w-1/3">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold text-lg text-gray-800">Terrible</div>
              <div className="text-xs text-gray-600 ml-1 mt-1">20:10</div>
            </div>
            <div className="text-violet-500 text-sm font-medium">Edit</div>
          </div>

          <div className="flex flex-col mt-3.5">
            <div className="flex justify-start">
              <span className="text-gray-700 text-opacity-70">You felt</span>
              <span className="font-bold ps-1"> Disappointed, Confused</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-700 text-opacity-70">Because of</span>
              <span className="font-bold ps-1"> Work</span>
            </div>
          </div>

          <div className="mt-3.5 text-sm text-gray-700">
            <span className="font-bold">Note:</span> The day didn’t go well in
            the morning. I tried to make coffee, but it burned out. I missed my
            bus...
          </div>
          <div className="flex justify-start text-violet-500 text-sm font-medium ">
            Read more +
          </div>

          <div className="flex justify-between items-center mt-5">
            <div className="font-bold text-lg text-gray-800">
              Recommendation
            </div>

            <div className="text-yellow-500 text-sm font-medium">Tip</div>
          </div>

          <div className="flex justify-start text-gray-700 text-opacity-70 mt-2">
            Spend time outdoors, surrounded by greenery and fresh air
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mood;
