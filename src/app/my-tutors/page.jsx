"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "@/lib/auth-client"; 
import { Plus, Edit2, Trash2, MapPin, Clock, DollarSign, BookOpen, Loader2, Users } from 'lucide-react';

const MyTutorsPage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !user) {
      router.push('/login');
      return;
    }

    if (user?.email) {
      fetchMyTutors(user.email);
    }
  }, [user, isPending, router]);

  const fetchMyTutors = async (email) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      const response = await fetch(`${baseUrl}/api/my-tutors/${email}`);
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      loading && setLoading(false);
    }
  };

  const handleDelete = async (tutorId) => {
    if (!confirm('Are you sure you want to delete this tutor?')) return;
    try {
      const baseUrl = process.env.NEXT_PUBLIC_URL || "";
      await fetch(`${baseUrl}/api/tutors/${tutorId}`, { method: 'DELETE' });
      setTutors(prev => prev.filter(t => t._id !== tutorId));
    } catch (error) {
      console.error('Error deleting tutor:', error);
    }
  };

  // ফিক্সড: ডোমেইন ইউআরএল বাদ দিয়ে শুধু ইন্টারনাল পাথ ব্যবহার করা হয়েছে
  const handleEdit = (tutorId) => {
    router.push(`/edit-tutor/${tutorId}`);
  };

  if (isPending || loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] gap-3">
        <Loader2 className="h-10 w-10 text-teal-600 animate-spin" />
        <p className="text-lg font-medium text-slate-600">Loading your tutors...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-800">My Tutors</h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Users size={18} className="text-teal-500" /> Managing profile for: {user.email}
            </p>
          </div>
          <button
            onClick={() => router.push('/add-tutor')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-teal-600/20"
          >
            <Plus size={20} />
            Add New Tutor
          </button>
        </div>

        {/* Content Section */}
        {tutors?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 text-center px-4">
            <div className="h-24 w-24 bg-teal-50 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-12 w-12 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No tutors added yet</h3>
            <p className="text-slate-500 mb-8 max-w-md">You haven't created any tutor profiles yet. Start sharing your expertise by adding your first profile.</p>
            <button
              onClick={() => router.push('/add-tutor')}
              className="px-8 py-3.5 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-md"
            >
              Create First Profile
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div key={tutor._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col">
                <div className="h-52 overflow-hidden relative bg-slate-100">
                  <img src={tutor.photo || 'https://via.placeholder.com/400x300'} alt={tutor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-lg shadow-sm">
                    {tutor.teachingMode}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{tutor.name}</h3>
                  <p className="text-teal-600 font-semibold text-sm mb-4 bg-teal-50 inline-block px-3 py-1 rounded-md w-fit">{tutor.subject}</p>
                  
                  <div className="space-y-2.5 text-sm text-slate-600 flex-1">
                    <p className="flex items-center gap-2"><MapPin size={16} className="text-slate-400"/> {tutor.location}</p>
                    <p className="flex items-center gap-2"><Clock size={16} className="text-slate-400"/> {tutor.availableDays} • {tutor.availableTime}</p>
                    <p className="flex items-center gap-2 font-medium text-slate-700">
                      <DollarSign size={16} className="text-teal-500"/> ৳{tutor.hourlyFee}/hour 
                      <span className="text-slate-300 mx-1">|</span> 
                      <span className={tutor.remainingSlots > 0 ? "text-emerald-600" : "text-rose-500"}>
                        {tutor.remainingSlots} slots left
                      </span>
                    </p>
                  </div>
                  
                  <div className="flex gap-3 mt-6 pt-5 border-t border-slate-100">
                    <button 
                      onClick={() => handleEdit(tutor._id)} 
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-700 rounded-xl font-semibold hover:bg-slate-100 transition-colors border border-slate-200"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(tutor._id)} 
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-semibold hover:bg-rose-100 transition-colors border border-rose-100"
                      title="Delete Profile"
                    >
                      <Trash2 size={16} />
                    </button>
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