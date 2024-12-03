import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const db = await connectDB();
        const allUsersCollection = db.collection('users');
        const users = await allUsersCollection.find({}).toArray(); // Get all bookings

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error fetching bookings' }, { status: 500 });
    }
};
