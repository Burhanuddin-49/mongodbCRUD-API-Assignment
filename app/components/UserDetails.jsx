import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { webUrl } from "@/dev";

const getUsers = async () => {
  try {
    const res = await fetch(`${webUrl}/api/users`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Could not get user details");
    }
    return res.json();
  } catch (error) {
    console.log("error loading users", error);
  }
};

async function UserDetails() {
  const { employee, personalDetails } = await getUsers();
  const mergedData = employee.map((emp) => {
    const correspondingPersonalDetail = personalDetails.find(
      (pd) => pd.publicId === emp.publicId
    );
    return {
      ...emp,
      ...correspondingPersonalDetail,
    };
  });

  return (
    <>
      {mergedData.map((data, index) => (
        <div
          key={index}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h6 className="font-bold text-xl">Employee Name: {data.name}</h6>
            <h6 className="font-bold text-xl">Age: {data.age}</h6>
            <h6 className="font-bold text-xl">Position: {data.position}</h6>
            <h6 className="font-bold text-xl">Department: {data.department}</h6>
            <h6 className="font-bold text-xl">Email: {data.email}</h6>
            <h6 className="font-bold text-xl">Address: {data.address}</h6>
          </div>
          <div className="flex gap-2">
            <RemoveBtn publicId={data.publicId} />
            <Link href={`/editUser/${data.publicId}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default UserDetails;
