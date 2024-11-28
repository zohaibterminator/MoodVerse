import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";

const googleai = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY! // This is also the default, can be omitted
);

export async function POST(
    req: Request
) {
    try {
        const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!process.env.GEMINI_API_KEY) {
          return new NextResponse("Google AI API Key not configured.", { status: 500 });
        }
        const latestanalysis = await db.aI_Sentiment_Analysis.findFirst({
            where: {
                OR: [
                  {
                    entry: {
                      userId: userId,
                    },
                  },
                  {
                    mood: {
                      userId: userId,
                    },
                  },
                ],
              },
            orderBy: {
                time: 'desc',
            },
        });
        const analysis_text = latestanalysis?.analysis ?? "";
        const system_msg = "You have to act as a therapist and only recommend stuff to make user feel better, according to analysis done by you";
        const model = googleai.getGenerativeModel({
          model:"gemini-1.5-flash",
          systemInstruction:system_msg,
        })
        const res = await model.generateContent([analysis_text]);
        console.log("check4");
        const content = res.response.text();

        const analysis_id = latestanalysis?.id!; // Using non-null assertion operator

        const recommend = await db.recommendation.create({
            data: {
                analysis_id: analysis_id,
                recommendations: content !== null ? content : "Default value or handle null case",
            }
        });
        return NextResponse.json(recommend);
    } catch (error) {
        console.log('[analysis]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try{
        const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const recommendation =await db.recommendation.findMany({
            where: {
              OR: [
                {
                  analysis: {
                    entry: {
                      userId: userId,
                    },
                  },
                },
                {
                  analysis: {
                    mood: {
                      userId: userId,
                    },
                  },
                },
              ],
            },
            include: {
              analysis: {
                include: {
                  entry: true, // Include details of the associated Journal Entry
                  mood: true, // Include details of the associated Mood Tracking entry
                },
              },
            },
            orderBy: {
              time: 'desc',
            },
          });
        return NextResponse.json(recommendation);
    }
    catch{
        console.log("eroor");
    }
}