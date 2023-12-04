"use client";
import Image from "next/image";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, BookOpenText, SmilePlus,Lightbulb,User ,Activity} from "lucide-react";
import { usePathname } from "next/navigation";

const dancing_script = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

const routes =[
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color : "text-sky-600",
    },
    {
      label: "Profile",
      icon: User,
      href: "/profile",
      color: "text-red-500",
      //bgColor : "bg-red-500/10",
    },
    {
        label: "Journal",
        icon: BookOpenText,
        href: "/journal",
        color : "text-green-600",
    },
    {
        label: "Mood",
        icon: SmilePlus,
        href: "/mood",
        color : "text-pink-500",
    },
    {
      label: "Analysis",
      icon: Activity,
      href: "/analysis",
      color : "text-cyan-500",
  },
    {
        label: "Recommendation",
        icon: Lightbulb,
        href: "/recommendation",
        color : "text-lime-600",
    },
    
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-r from-yellow-100 to-purple-100 text-purple-700">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image fill alt="Logo" src="/loho2.jpg" />
          </div>
          <h1 className={cn("text-3xl font-bold", dancing_script.className)}>
            MoodVerse
          </h1> 
        </Link>
        <div className="space-y-1">
            {routes.map((route)=>(
                <Link 
                href={route.href}
                key={route.href}
                className={cn("text-sm group flex p-3 w-full jusitfy start font-medium cursor-pointer hover:bg-white/50 rounded-lg transition", pathname===route.href? "bg-white/40 ":"text-purple-500"
                )}
                >
                <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w-5 mr-3",route.color)} />
                    {route.label}
                </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
