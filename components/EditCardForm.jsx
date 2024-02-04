"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditCardForm({ id, name, dob, mobileNumber }) {
  const [newName, setNewName] = useState(name || '');
  const [newDob, setNewDob] = useState(dob || '');
  const [newMobileNumber, setNewMobileNumber] = useState(mobileNumber || '');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({newName,newDob,newMobileNumber}),
      });

      if (!res.ok) {
        throw new Error("Failed to update employee");
      }

      const updatedEmployee = await res.json();
      console.log("Updated Employee:", updatedEmployee);

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-4 bg-white rounded-md shadow-md">
      <label htmlFor="employeeName" className="block text-gray-700 font-semibold mb-2">Employee Name</label>
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        type="text"
        id="employeeName"
        placeholder="Employee name"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
      />

      <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date Of Birth</label>
      <input
        onChange={(e) => setNewDob(e.target.value)}
        value={newDob}
        type="date"
        id="dob"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
      />

      <label htmlFor="mobileNumber" className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
      <input
        onChange={(e) => setNewMobileNumber(e.target.value)}
        value={newMobileNumber}
        type="text"
        id="mobileNumber"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
      />

      <button type="submit" className="bg-green-600 text-white py-3 px-6 w-fit rounded-lg">Update Detail</button>
    </form>
  );
}
