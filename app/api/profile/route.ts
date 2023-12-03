import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req:Request,
){
    try{
        const { userId }=auth();
        const {first_name,last_name,email,date_of_birth,profession,gender,phone_num} = await req.json();
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const user_profile = await db.user_Profile.create({
            data:{
                id:userId,
                first_name,
                last_name,
                email,
                date_of_birth,
                profession,
                gender,
                phone_num 
            },
        });
        return NextResponse.json(user_profile);
    }
    catch (error){
        console.log("[Profile]",error);
        return new NextResponse("Internal Error", {status:500});
    }
}