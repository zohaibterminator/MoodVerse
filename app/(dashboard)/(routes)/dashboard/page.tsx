"use client";
import { ArrowRight, BookOpenText, SmilePlus, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
const tools = [
  {
    label: "Journal",
    icon: BookOpenText,
    href: "/journal",
    color: "text-green-600",
    //bgColor: "bg-green-600/10"
  },
  {
    label: "Mood",
    icon: SmilePlus,
    href: "/mood",
    color: "text-pink-500",
    //bgColor : "bg-pink-500/10",
  },
  {
    label: "Recommendation",
    icon: Lightbulb,
    href: "/recommendation",
    color: "text-red-500",
    //bgColor : "bg-red-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();
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
