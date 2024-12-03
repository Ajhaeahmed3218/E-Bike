import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const allBookingCollection = db.collection('bookings');
        const bookings = await allBookingCollection.find({}).toArray(); // Get all bookings

        return NextResponse.json({ bookings }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
    }
};
