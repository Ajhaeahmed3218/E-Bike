import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";  // Import ObjectId for MongoDB

// DELETE method: Delete a user by ID
export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;  // Get the ID from the URL params
    console.log(id);

    // Connect to the database
    const db = await connectDB();
    const usersCollection = db.collection('users');  // Delete from the 'users' collection

    // Delete the document by its ID
    const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Successfully deleted
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user", error: error.message }, { status: 500 });
  }
};

