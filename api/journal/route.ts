import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST (
    req:Request,
){
    try{
        
        const { userId }=await auth();
        const { journal_text } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const Journal_Entries = await db.journal_Entries.create({
            data:{
                userId,
                journal_text
            }
        });
        return NextResponse.json(Journal_Entries);
    }
    catch (error){
        const { userId }=await auth();
        console.log(userId);
        //console.log("[JOURNAL]",error);
        return new NextResponse("Internal Error", {status:500});
    }
}

export async function GET() {
    try{
        const { userId }=await auth();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        const journal_text=await db.journal_Entries.findMany({
            where:{
                userId:userId
            },
            orderBy: {
                time: 'desc',
              },
        });
        return NextResponse.json(journal_text);
    }
    catch{
        console.log("eroor");
    }
}