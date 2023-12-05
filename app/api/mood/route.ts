import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req:Request,
){
    try{
        const { userId }=auth();
        const {mood,Note,intensity,location,weather} = await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const mood_tracking = await db.mood_Tracking.create({
            data:{
                userId,
                mood,
                Note,
                intensity,
                location,
                weather
            },
        });
        return NextResponse.json(mood_tracking);
    }
    catch (error){
        console.log("[Profile]",error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function GET() {
    try{
        const { userId }=auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        const mood=await db.mood_Tracking.findMany({
            where:{
                userId:userId
            },
            orderBy: {
                time: 'desc',
              },
        });
        return NextResponse.json(mood);
    }
    catch{
        console.log("eroor");
    }
}