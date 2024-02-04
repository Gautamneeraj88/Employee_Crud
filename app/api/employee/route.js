import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";


export async function POST(request) {
    const {name, dob, mobileNumber, photograph} = await request.json();
    await connectMongoDB();
    await Employee.create({name, dob, mobileNumber, photograph});
    return NextResponse.json({message:"Card Created"}, {status: 200});
}


export async function GET() {
    await connectMongoDB();
    const employees = await Employee.find();
    return NextResponse.json(employees);
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Employee.findByIdAndDelete(id);
    return NextResponse.json({message:"Card deleted"}, {status: 200});
}