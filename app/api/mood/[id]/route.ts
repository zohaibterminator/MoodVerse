// D:\FAST\db-project\MoodVerse\app\api\mood\[id]\route.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = auth();

    if (!userId) {
      console.log("Unauthorized");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = req.query;

    console.log("Deleting mood entry:", id);

    // Check if the mood entry exists and belongs to the user
    const moodEntry = await db.mood_Tracking.findUnique({
      where: {
        id: id?.toString(),
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
        id: id?.toString(),
      },
    });

    console.log("Mood entry deleted successfully");

    res.status(204).end(); // 204 No Content indicates successful deletion
  } catch (error) {
    console.error("[Mood] Error deleting mood entry:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export { handleDelete as DELETE }; // Export handleDelete as DELETE

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await handleDelete(req, res);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
