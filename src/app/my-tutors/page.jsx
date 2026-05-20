"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client"; // ✅ Better Auth

const MyTutorsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!isPending && !user) {
      router.push(`${process.env.NEXT_PUBLIC_URL}/login`);
      return;
    }

    if (user?.email) {
      fetchMyTutors(user.email);
    }
  }, [user, isPending, router]);

  const fetchMyTutors = async (email) => {
    try {
    
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/my-tutors/${email}`);
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tutorId) => {
    if (!confirm('Are you sure you want to delete this tutor?')) return;
    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tutors/${tutorId}`, { method: 'DELETE' });
      setTutors(prev => prev.filter(t => t._id !== tutorId));
    } catch (error) {
      console.error('Error deleting tutor:', error);
    }
  };

  const handleEdit = (tutorId) => {
    router.push(`${process.env.NEXT_PUBLIC_URL}/edit-tutor/${tutorId}`);
  };

  if (isPending || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-teal-600 animate-pulse">
          {isPending ? 'Checking login...' : 'Loading your tutors...'}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tutors</h1>
            <p className="text-gray-600 mt-1">Managing tutors for: {user.email}</p>
          </div>
          <button
            onClick={() => router.push(`${process.env.NEXT_PUBLIC_URL}/add-tutor`)}
            className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors shadow-md"
          >
            + Add New Tutor
          </button>
        </div>

        {tutors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No tutors added yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first tutor!</p>
            <button
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_URL}/add-tutor`)}
              className="px-6 py-2.5 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Add Your First Tutor
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div key={tutor._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img src={tutor.photo || 'https://via.placeholder.com/400x300'} alt={tutor.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-3 py-1 bg-teal-600 text-white text-xs font-medium rounded-full">
                    {tutor.teachingMode}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{tutor.name}</h3>
                  <p className="text-teal-600 font-medium mb-3">{tutor.subject}</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 {tutor.location}</p>
                    <p>🎓 {tutor.institution}</p>
                    <p>⏰ {tutor.availableDays} {tutor.availableTime}</p>
                    <p>💰 ৳{tutor.hourlyFee}/hour • 🪑 {tutor.remainingSlots} slots left</p>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button onClick={() => handleEdit(tutor._id)} className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">✏️ Edit</button>
                    <button onClick={() => handleDelete(tutor._id)} className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors text-sm">🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTutorsPage;