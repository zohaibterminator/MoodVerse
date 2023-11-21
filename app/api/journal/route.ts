import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req:Request,
){
    try{
        const { userId }=auth();
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
        console.log("[JOURNAL]",error);
        return new NextResponse("Internal Error", {status:500});
    }
}