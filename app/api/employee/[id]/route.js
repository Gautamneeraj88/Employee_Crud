import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }){
    const {id} = params;
    const {newName: name, newDob: dob, newNumber: mobileNumber} = await request.json();
    await connectMongoDB();
    const result = await Employee.findByIdAndUpdate(id, {name, dob, mobileNumber});
    console.log(result);
    return NextResponse.json({message:"Card updated"}, {status:200});
}


export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const employees = await Employee.findOne({_id:id});
    return NextResponse.json({employees}, {status:200});
}
