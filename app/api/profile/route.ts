import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Import necessary modules

export async function POST(req: Request) {
    try {
      const { userId }=await auth();
      const {
        first_name,
        last_name,
        email,
        date_of_birth,
        profession,
        gender,
        phone_num,
      } = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Check if the user profile already exists
      const existingProfile = await db.user_Profile.findUnique({
        where: { id: userId },
      });
  
      if (existingProfile) {
        // If the profile exists, update it
        const updatedProfile = await db.user_Profile.update({
          where: { id: userId },
          data: {
            first_name,
            last_name,
            email,
            date_of_birth,
            profession,
            gender,
            phone_num,
          },
        });
  
        return NextResponse.json(updatedProfile);
      } else {
        // If the profile doesn't exist, create a new one
        const newProfile = await db.user_Profile.create({
          data: {
            id: userId,
            first_name,
            last_name,
            email,
            date_of_birth,
            profession,
            gender,
            phone_num,
          },
        });
  
        return NextResponse.json(newProfile);
      }
    } catch (error) {
      console.log("[Profile]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }  

export async function GET() {
    try{
      const { userId }=await auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        const profile=await db.user_Profile.findMany({
            where:{
                id:userId
            }
        });
        return NextResponse.json(profile);
    }
    catch{
        console.log("eroor");
        return NextResponse.json("lol")
    }
}