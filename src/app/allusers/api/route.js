import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST =  async  (request) => {
    const newUser = await request.json();

    try {
        const db = await connectDB()
        const allbookingCollection = db.collection('users')
        const resp = await allbookingCollection.insertOne(newUser)
        return NextResponse.json({message : "New user addeds"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message : error.message}, {status: 500})
        
    }
}