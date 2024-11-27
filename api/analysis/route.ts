import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from 'openai';
import { db } from "@/lib/db";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

export async function POST(
    req: Request
) {
    try {
      const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }
        const journal_text = (await req.json()).journal_text;
        const system_msg = "You are have to act as a therapist and only analyse, journal Entry provided by user";
        const res = await openai.chat.completions.create({
            messages: [
              { role: "system", content: system_msg },
              { role: "user", content: journal_text }
            ],
            model: "gpt-3.5-turbo",
          });
        const content = res.choices[0].message.content;
        
        const latestJournalEntry = await db.journal_Entries.findFirst({
            where: {
                userId: userId, // replace with the actual user ID
            },
            orderBy: {
                time: 'desc',
            },
        });

        const entry_id = latestJournalEntry?.id!; // Using non-null assertion operator

        const analysis = await db.aI_Sentiment_Analysis.create({
            data: {
                entry_id: entry_id,
                analysis: content !== null ? content : "Default value or handle null case",
            }
        });

        
        return NextResponse.json(analysis);
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