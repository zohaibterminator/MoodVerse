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
        console.log("check1");
        const { userId }=await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!process.env.GEMINI_API_KEY) {
            return new NextResponse("Google AI API Key not configured.", { status: 500 });
        }
        console.log("check2");
        const {mood,Note,intensity,location,weather} = await req.json();
        console.log("check3");
        const system_msg = "You are have to act as a therapist and only analyze mood details provided by user. Your response should be in the form of a paragraph.";
        const usermsg = "Mood: " + mood+ " Note with mood: " + Note +" intensity: "+intensity+" location: "+location+" weather: "+weather;

        const model = googleai.getGenerativeModel({
            model:"gemini-1.5-flash",
            systemInstruction:system_msg,
        })
        const res = await model.generateContent([usermsg]);
        console.log("check4");
        const content = res.response.text();
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

        console.log(analysis);

        return NextResponse.json(analysis);
    } catch (error) {
        console.log('[analysis]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}