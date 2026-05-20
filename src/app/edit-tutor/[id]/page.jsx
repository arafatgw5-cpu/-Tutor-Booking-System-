"use client";


import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

const EditTutorPage = ({ params }) => {
  const router = useRouter();

 
  const unwrappedParams = use(params);
  const tutorId = unwrappedParams.id;

  // form state
  const [formData, setFormData] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(true);

  // tutor fetch
  useEffect(() => {
    const fetchSingleTutor = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tutors/${tutorId}`);

        if (!res.ok) {
          throw new Error("Tutor not found");
        }

        const data = await res.json();

        setFormData({
          name: data.name || "",
        });
      } catch (error) {
        console.error("Error fetching tutor:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tutorId) {
      fetchSingleTutor();
    }
  }, [tutorId]);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // update tutor
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tutors/${tutorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Tutor updated successfully!");
        router.push("/my-tutors");
        router.refresh();
      } else {
        alert(data.message || "Failed to update tutor");
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // loading
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Loading Tutor Data...
      </div>
    );
  }

  // not found
  if (!formData.name) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">
        Tutor not found!
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-teal-600">
        Edit Tutor: {formData.name}
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <p className="text-gray-600 mb-4">
          Tutor ID: {tutorId}
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Save Changes
          </button>

          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTutorPage;