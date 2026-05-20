import { NextResponse } from 'next/server';

const mockTutors = [
  {
    _id: '1',
    name: 'Md. Habib',
    subject: 'Mathematics',
    teachingMode: 'Online',
    availableDays: 'Mon, Wed, Fri',
    availableTime: '3:00 PM - 8:00 PM',
    institution: 'Dhaka University',
    experience: '5 years',
    location: 'Dhaka',
    hourlyFee: '500',
    photo: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
  {
    _id: '2',
    name: 'Fatima Ahmed',
    subject: 'English',
    teachingMode: 'Hybrid',
    availableDays: 'Tue, Thu, Sat',
    availableTime: '2:00 PM - 7:00 PM',
    institution: 'BUET',
    experience: '3 years',
    location: 'Gulshan',
    hourlyFee: '400',
    photo: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
  {
    _id: '3',
    name: 'Karim Hassan',
    subject: 'Physics',
    teachingMode: 'Online',
    availableDays: 'Mon, Thu, Sat',
    availableTime: '4:00 PM - 9:00 PM',
    institution: 'Dhaka College',
    experience: '7 years',
    location: 'Mirpur',
    hourlyFee: '600',
    photo: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
  {
    _id: '4',
    name: 'Aisha Khan',
    subject: 'Chemistry',
    teachingMode: 'In-person',
    availableDays: 'Tue, Wed, Fri',
    availableTime: '1:00 PM - 6:00 PM',
    institution: 'Jahangirnagar University',
    experience: '4 years',
    location: 'Banani',
    hourlyFee: '550',
    photo: 'https://i.ibb.co/4pDNDk1/avatar.png',
  },
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '4', 10);

    const tutors = mockTutors.slice(0, limit);

    return NextResponse.json(tutors, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tutors' },
      { status: 500 }
    );
  }
}
