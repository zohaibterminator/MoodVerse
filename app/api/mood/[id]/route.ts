import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.log("Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the `id` from the dynamic route parameters
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      console.log("Invalid ID");
      return new NextResponse("Bad Request", { status: 400 });
    }

    console.log("Deleting mood entry:", id);

    // Check if the mood entry exists and belongs to the user
    const moodEntry = await db.mood_Tracking.findUnique({
      where: {
        id,
      },
      include: {
        analysis: {
          include: {
            recommendation: true,
          },
        },
      },
    });

    if (!moodEntry || moodEntry.userId !== userId) {
      console.log("Mood entry not found or doesn't belong to the user");
      return new NextResponse("Not Found", { status: 404 });
    }

    // Delete corresponding analysis and recommendation
    if (moodEntry.analysis) {
      await db.aI_Sentiment_Analysis.delete({
        where: {
          id: moodEntry.analysis.id,
        },
      });

      if (moodEntry.analysis.recommendation) {
        await db.recommendation.delete({
          where: {
            id: moodEntry.analysis.recommendation.id,
          },
        });
      }
    }

    // Delete the mood entry
    await db.mood_Tracking.delete({
      where: {
        id,
      },
    });

    console.log("Mood entry deleted successfully");

    return new NextResponse(null, { status: 204 }); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error("[Mood] Error deleting mood entry:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}