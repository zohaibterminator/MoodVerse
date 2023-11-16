"use client";
import Image from "next/image";
import Link from "next/link";
import { Dancing_Script} from "next/font/google";
import { cn } from "@/lib/utils";

const dancing_script = Dancing_Script({
    weight:"700", 
    subsets:["latin"]
});
const Sidebar = () => {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full  text-orange-500">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image fill alt="Logo" src="/loho2.jpg" />
          </div>
          <h1 className={cn("text-3xl font-bold",dancing_script.className)}>MoodVerse</h1>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
