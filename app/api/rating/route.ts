import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (
    req:Request,
){
    try {
      const { userId }=await auth();
      const { recommendationId, rating } = await req.json();
  
      if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
  
      // Check if the rating for the recommendation already exists
      const existingRating = await db.rating.findFirst({
        where: {
          recommendation_id: recommendationId,
        },
      });
  
      if (existingRating) {
        // Update the existing rating
        const updatedRating = await db.rating.update({
          where: {
            id: existingRating.id,
          },
          data: {
            rating: rating,
          },
        });
  
        return NextResponse.json(updatedRating);
      } else {
        // Create a new rating
        const newRating = await db.rating.create({
          data: {
            recommendation_id: recommendationId,
            rating: rating,
          },
        });
  
        return NextResponse.json(newRating);
      }
    } catch (error) {
      console.error('[RATING]', error);
      return new NextResponse('Internal Error', { status: 500 });
    }
  }

export async function GET() {
    try{
      const { userId }=await auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        const ratings = await db.rating.findMany({
            where: {
              OR: [
                {
                  recommendation: {
                    analysis: {
                      entry: {
                        userId: userId,
                      },
                    },
                  },
                },
                {
                  recommendation: {
                    analysis: {
                      mood: {
                        userId: userId,
                      },
                    },
                  },
                },
              ],
            },
            include: {
              recommendation: true, // Include the nested recommendation data
            },
            orderBy: {
              time: 'desc',
            },
          });
        return NextResponse.json(ratings);
    }
    catch{
        console.log("eroor");
    }
}