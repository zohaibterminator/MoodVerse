import { db } from "@/lib/db"; // Make sure to adjust the path based on your actual database connection
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Define the type for the user profile data
interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth?: number;
  profession?: string;
  gender?: string;
  phone_num?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get the authenticated user's session ID from Clerk
    const { userId } = await auth();

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parse the incoming JSON request body to get user details
    const {
      first_name,
      last_name,
      email,
      date_of_birth,
      profession,
      gender,
      phone_num,
    }: UserProfile = await req.json();

    // Check if the profile already exists in the database
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

      // Return the updated profile as a JSON response
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

      // Return the newly created profile as a JSON response
      return NextResponse.json(newProfile);
    }
  } catch (error) {
    console.error("[Profile Sync Error]:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}