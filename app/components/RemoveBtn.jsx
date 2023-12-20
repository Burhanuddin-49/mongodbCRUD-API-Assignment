"use client";

import { webUrl } from "@/dev";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

function RemoveBtn({ publicId }) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      const res = await fetch(`${webUrl}/api/users?publicId=${publicId}`, {
        method: "DELETE",
      });

      if (res.ok) router.refresh();
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}

export default RemoveBtn;
