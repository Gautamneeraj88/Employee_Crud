"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({id}){
    console.log(id)
    const route = useRouter();

    const removeCard = async () => {
        const confirmed = confirm("Are you sure?");
    
        if(confirmed) {
            const res = await fetch(`http://localhost:3000/api/employee?id=${id}`,{
                method: "DELETE",
            });
    
            if(res.ok) {
                route.refresh();
            }
        }
    }
    return <button onClick={removeCard} className="text-red-400"><HiOutlineTrash size={24}/></button>;
}