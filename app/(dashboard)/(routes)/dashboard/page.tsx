"use client";
import { useEffect } from "react";
import { ArrowRight, BookOpenText, SmilePlus, Lightbulb, User, Activity, Star } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; // Use the useUser hook
import axios from "axios"; // For making API requests

const tools = [
  {
    label: "Profile",
    icon: User,
    href: "/profile",
    color: "text-red-500",
  },
  {
    label: "Journal",
    icon: BookOpenText,
    href: "/journal",
    color: "text-green-600",
  },
  {
    label: "Mood",
    icon: SmilePlus,
    href: "/mood",
    color: "text-pink-500",
  },
  {
    label: "Analysis",
    icon: Activity,
    href: "/analysis",
    color: "text-cyan-500",
  },
  {
    label: "Recommendation",
    icon: Lightbulb,
    href: "/recommendation",
    color: "text-lime-500",
  },
  {
    label: "Rating",
    icon: Star,
    href: "/ratings",
    color: "text-orange-600",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser(); // Access user details from useUser hook

  useEffect(() => {
    // Check if user is signed in and details are loaded
    const syncUserToDatabase = async () => {
      if (isSignedIn && user) {
        try {
          // Get the user details
          const userDetails = {
            id: user.id, // Use the user ID
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.primaryEmailAddress?.emailAddress || "", // Ensure email is available
          };

          // Send POST request to the backend to sync user data
          await axios.post("/api/register", userDetails);

          console.log("User details synced to the database.");
        } catch (error) {
          console.error("Error syncing user details:", error);
        }
      }
    };

    // Sync user details when the component is mounted and user is signed in
    if (isLoaded && isSignedIn) {
      syncUserToDatabase();
    }
  }, [isLoaded, isSignedIn, user]); // Re-run this effect when user details are available

  return (
    <div className="mb-8 space-y-4 text-center">
      <h2 className="text-2xl font-semibold text-purple-700">
        Your Personalized AI Recommendations
      </h2>
      <p className="text-lg text-gray-700">
        Explore a world of content tailored just for you based on your journal
        entries and mood insights.
      </p>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <tool.icon className={cn("w-8 h-8", tool.color)} />

              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;