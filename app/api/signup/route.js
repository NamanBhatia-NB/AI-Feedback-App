import { hash } from "bcryptjs";
import User from "@/app/models/User";
import connectDB from "@/app/utils/db";

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return Response.json({ message: "User created successfully", userId: newUser._id });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
