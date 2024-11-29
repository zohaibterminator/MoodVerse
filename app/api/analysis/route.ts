import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/db";

const googleai = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY! // This is also the default, can be omitted
);

export async function POST(
    req:Request
) {
    try {
        const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!process.env.GEMINI_API_KEY) {
          return new NextResponse("Google AI API Key not configured.", { status: 500 });
        }
        const { journal_text } = await req.json();
        const system_msg = "You are have to act as a therapist and only analyze journal entry provided by user. Your response should be in the form of a paragraph.";
        const model = googleai.getGenerativeModel({
          model:"gemini-1.5-flash",
          systemInstruction:system_msg,
        });

        const res = await model.generateContent([journal_text]);
        console.log(res);

        const content = res.response.text();
        console.log("Gemini response retrieved ", content);

        const latestJournalEntry = await db.journal_Entries.findFirst({
            where: {
                userId: userId, // replace with the actual user ID
            },
            orderBy: {
                time: 'desc',
            },
        });
        if (latestJournalEntry)
          console.log("Journal Entry retrieved", latestJournalEntry);
        
        const entry_id = latestJournalEntry?.id!; // Using non-null assertion operator

        console.log("Entry ID ", entry_id);

        const analysis = await db.aI_Sentiment_Analysis.create({
            data: {
              entry_id: entry_id,
              analysis: content !== null ? content : "Default value or handle null case",
            }
        });

        if (analysis == null)
          console.log("Analysis is null");

        return NextResponse.json(analysis);

    } catch (error) {
        //console.log('[analysis]', error);
        return NextResponse.json(
          { message: "Internal Server Error", error: error instanceof Error ? error.message : String(error) },
          { status: 500 }
        );
    }
}

export async function GET() {
    try{
      const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const analysis = await db.aI_Sentiment_Analysis.findMany({
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
            include: {
              entry: true, // Include related journal entry details
              mood: true, // Include related mood tracking details
            },
          });
        return NextResponse.json(analysis);
    }
    catch{
        console.log("eroor");
    }
}