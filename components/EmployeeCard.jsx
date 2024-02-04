import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracting only the date part
  };
  
  const getCards = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employee", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch employee data');
      }
  
      const data = await res.json();
  
      console.log("Fetched data:", data);
  
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
  
      const formattedData = data.map((item) => ({
        ...item,
        dob: getFormattedDate(item.dob),
      }));
  
      return formattedData;
    } catch (error) {
      console.error("Error loading employee data: ", error);
      return [];
    }
  };
  

export default async function EmployeeCard() {
  const cards = await getCards();

  return (
    <>
      {cards.map((employee) => (
        <div key={employee._id} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4">
          <div>
            <img
              src={employee.photograph || "https://via.placeholder.com/150"}
              alt={`Photograph of ${employee.name}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col ml-4">
            <h2 className="text-lg font-bold mb-1">Employee Name: {employee.name}</h2>
            <p className="text-gray-600 mb-1">Date of Birth: {employee.dob}</p>
            <p className="text-gray-600 mb-1">Mobile Number: {employee.mobileNumber}</p>
          </div>
          <div className="flex items-center ml-auto space-x-2">
            <RemoveBtn id={employee._id} />
            <Link href={`/editCard/${employee._id}`} className="text-green-400">
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
