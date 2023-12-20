"use client";

import { webUrl } from "@/dev";
import { useRouter } from "next/navigation";
import { useState } from "react";

function AddUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !position || !department || !email || !address) {
      alert("Fill all box");
      return;
    }

    try {
      const res = await fetch(`${webUrl}/api/users`, {
        method: "POST",
        headers: {
          Content_type: "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          position,
          department,
          email,
          address,
        }),
      });

      if (res.ok) router.push("/");
      else throw new Error("Failed to create a user");
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
        value={name}
        onChange={handleNameChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Age"
        value={age}
        onChange={handleAgeChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Position"
        value={position}
        onChange={handlePositionChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Department"
        value={department}
        onChange={handleDepartmentChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Address"
        value={address}
        onChange={handleAddressChange}
      />
      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        type="submit"
      >
        Add User
      </button>
    </form>
  );
}

export default AddUser;
