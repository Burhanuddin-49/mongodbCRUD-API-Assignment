import EditUserForm from "@/app/components/EditUserForm";
import { webUrl } from "@/dev";

const getUserById = async (id) => {
  try {
    const res = await fetch(`${webUrl}/api/users/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
async function EditUser({ params }) {
  const { id } = params;
  const { employee, personalDetails } = await getUserById(id);
  return (
    <EditUserForm
      publicId={id}
      employee={employee}
      personalDetails={personalDetails}
    />
  );
}

export default EditUser;
