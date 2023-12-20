"use client";

import { webUrl } from "@/dev";
import { useRouter } from "next/navigation";
import { useState } from "react";

function EditUserForm({ publicId, employee, personalDetails }) {
  const router = useRouter();
  const { name, position, department } = employee;
  const { age, email, address } = personalDetails;

  const [newName, setNewName] = useState(name);
  const [newAge, setNewAge] = useState(age);
  const [newPosition, setNewPosition] = useState(position);
  const [newDepartment, setNewDepartment] = useState(department);
  const [newEmail, setNewEmail] = useState(email);
  const [newAddress, setNewAddress] = useState(address);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setNewAge(e.target.value);
  };

  const handlePositionChange = (e) => {
    setNewPosition(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setNewDepartment(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setNewAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${webUrl}/api/users/${publicId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newName,
          newAge,
          newPosition,
          newDepartment,
          newEmail,
          newAddress,
        }),
      });
      if (!res.ok) throw new Error("Failed to update users");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Name"
        value={newName}
        onChange={handleNameChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Age"
        value={newAge}
        onChange={handleAgeChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Position"
        value={newPosition}
        onChange={handlePositionChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Department"
        value={newDepartment}
        onChange={handleDepartmentChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Email"
        value={newEmail}
        onChange={handleEmailChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Address"
        value={newAddress}
        onChange={handleAddressChange}
      />
      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        type="submit"
      >
        Update User
      </button>
    </form>
  );
}

export default EditUserForm;
