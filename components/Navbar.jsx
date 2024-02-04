import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 rounded-xl">
            <Link className="text-white font-bold" href={"/"}>Home</Link>
            <Link className="bg-white p-2 rounded-lg" href={"/addEmployee"}>Add Employee</Link>
        </nav>
    );
}