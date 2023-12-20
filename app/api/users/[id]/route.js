import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import PersonalDetails from "@/models/personalDetails";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const publicId = id;
  const {
    newName: name,
    newPosition: position,
    newDepartment: department,
    newAge: age,
    newEmail: email,
    newAddress: address,
  } = await request.json();
  await connectMongoDB();
  await Employee.findOneAndUpdate({ publicId }, { name, position, department });
  await PersonalDetails.findOneAndUpdate(
    { publicId },
    { name, age, email, address }
  );
  return NextResponse.json({ message: "User updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  const publicId = id;
  await connectMongoDB();
  const employee = await Employee.findOne({ publicId });
  const personalDetails = await PersonalDetails.findOne({ publicId });
  return NextResponse.json({ employee, personalDetails }, { status: 200 });
}
