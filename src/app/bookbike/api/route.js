import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST =  async  (request) => {
    const newBooking = await request.json();

    try {
        const db = await connectDB()
        const allbookingCollection = db.collection('bookings')
        const resp = await allbookingCollection.insertOne(newBooking)
        return NextResponse.json({message : "Bike is Booked"}, {status: 200})
    } catch (error) {
        
    }
}