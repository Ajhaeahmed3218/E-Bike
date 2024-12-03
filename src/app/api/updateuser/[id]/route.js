import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";  // Import ObjectId for MongoDB

// PATCH method: Update a user by ID
export const PATCH = async (request, { params }) => {
  try {
    const { id } = params;  // Get the ID from the URL params
    const data = await request.json();  // Get the updated data from the request body

    if (!data) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    // Connect to the database
    const db = await connectDB();
    const usersCollection = db.collection('users');  // Update the 'users' collection

    // Find the user by ID and update their details
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },  // Find user by ID
      { $set: data }  // Update user data with new values
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ message: "User not found or no changes made" }, { status: 404 });
    }

    // Successfully updated
    return NextResponse.json({ message: "User Updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 });
  }
};
