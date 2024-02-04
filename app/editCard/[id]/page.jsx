import EditCardFrom from "@/components/EditCardForm";

const getCardById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch employee with ID: ${id}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null; // or handle the error as needed
  }
};

export default async function EditCard({ params }) {
  const { id } = params;
  const card = await getCardById(id);

  if (!card) {
    // Handle the case where the card is not available
    return <div>Error loading employee data</div>; // or another fallback UI
  }

  const { name, dob, mobileNumber } = card;

  return <EditCardFrom id={id} name={name} dob={dob} mobileNumber={mobileNumber} />;
}
