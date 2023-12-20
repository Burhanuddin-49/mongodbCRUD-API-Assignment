import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import PersonalDetails from "@/models/personalDetails";
import { NextResponse } from "next/server";

function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length = 8; // You can adjust the length of the ID as needed
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

export async function POST(request) {
  const publicId = generateRandomId();
  const { name, position, department, age, email, address } =
    await request.json();
  await connectMongoDB();
  await Employee.create({ publicId, name, position, department });
  await PersonalDetails.create({ publicId, name, age, email, address });
  return NextResponse.json({ message: "User created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const employee = await Employee.find();
  const personalDetails = await PersonalDetails.find();
  return NextResponse.json({ employee, personalDetails });
}

export async function DELETE(request) {
  const publicId = request.nextUrl.searchParams.get("publicId");
  await connectMongoDB();
  await Employee.findOneAndDelete({ publicId });
  await PersonalDetails.findOneAndDelete({ publicId });
  return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
}
