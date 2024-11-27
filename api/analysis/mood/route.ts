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
        console.log("check1");
        const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }
        console.log("check2");
        const {mood,Note,intensity,location,weather} = await req.json();
        console.log("check3");
        const system_msg = "You are have to act as a therapist and only analyse, mood details provided by user";
        const usermsg = "Mood: " + mood+ " Note with mood: " + Note +" intensity: "+intensity+" location: "+location+" weather: "+weather;
        const res = await openai.chat.completions.create({
            messages: [
              { role: "system", content: system_msg },
              { role: "user", content: usermsg },
            ],
            model: "gpt-3.5-turbo",
          });
          console.log("check4");
        const content = res.choices[0].message.content;
        console.log(content);
        const latestMoodEntry = await db.mood_Tracking.findFirst({
            where: {
                userId: userId, // replace with the actual user ID
            },
            orderBy: {
                time: 'desc',
            },
        });

        const mood_id = latestMoodEntry?.id!; // Using non-null assertion operator

        const analysis = await db.aI_Sentiment_Analysis.create({
            data: {
                mood_id:mood_id,
                analysis: content !== null ? content : "Default value or handle null case",
            }
        });
        return NextResponse.json(analysis);
    } catch (error) {
        console.log('[analysis]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}