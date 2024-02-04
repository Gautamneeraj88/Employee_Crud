// AddEmployee.jsx
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"; // Change import statement

export default function AddEmployee() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [photograph, setPhotograph] = useState(null);
  
    const router = useRouter();
  
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      
      if (file) {
        // Convert image to base64
        const base64Image = await convertToBase64(file);
        setPhotograph(base64Image);
      }
    };
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          resolve(reader.result);
        };
  
        reader.onerror = reject;
  
        reader.readAsDataURL(file);
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        if (!name || !dob || !mobileNumber || !photograph) {
          alert("All fields are required");
          return;
        }
  
        const response = await fetch("http://localhost:3000/api/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            dob,
            mobileNumber,
            photograph,
          }),
        });
  
        if (response.ok) {
          router.push("/");
        } else {
          throw new Error("Failed to create an employee");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-4 bg-white rounded-md shadow-md"
      >
        <label htmlFor="employeeName" className="block text-gray-700 font-semibold mb-2">
          Employee Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="employeeName"
          placeholder="Employee name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
        />
  
        <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
          Date Of Birth
        </label>
        <input
          onChange={(e) => setDob(e.target.value)}
          value={dob}
          type="date"
          id="dob"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
        />
  
        <label htmlFor="mobileNumber" className="block text-gray-700 font-semibold mb-2">
          Mobile Number
        </label>
        <input
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
          type="text"
          id="mobileNumber"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
        />
  
        <label htmlFor="photograph" className="block text-gray-700 font-semibold mb-2">
          Photograph
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          id="photograph"
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 mb-2"
        />
  
        <button type="submit" className="bg-green-600 text-white py-3 px-6 w-fit rounded-lg">
          Add Employee
        </button>
      </form>
    );
}
