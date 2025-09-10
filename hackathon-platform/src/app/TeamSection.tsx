import React from 'react';

const teamMembers = [
  {
    name: 'Jha Suraj Kumar',
    role: 'Founder',
    image: '/team/aman.jpg',
    bio: 'Visionary leader and hackathon enthusiast.'
  },
  {
    name: 'Chinmay Bhatt',
    role: 'Co-Founder',
    image: '/team/priya.jpg',
    bio: 'Community builder and product strategist.'
  },
  {
    name: 'Rohit Singh',
    role: 'Tech Lead',
    image: '/team/rohit.jpg',
    bio: 'Full-stack developer and mentor.'
  },
  {
    name: 'Sneha Patel',
    role: 'Design Lead',
    image: '/team/sneha.jpg',
    bio: 'UI/UX designer and creative mind.'
  },
  {
    name: 'Vikas Gupta',
    role: 'Operations',
    image: '/team/vikas.jpg',
    bio: 'Logistics and event management.'
  },
  {
    name: 'Vikas Gupta',
    role: 'Operations',
    image: '/team/vikas.jpg',
    bio: 'Logistics and event management.'
  },
  {
    name: 'Vikas Gupta',
    role: 'Operations',
    image: '/team/vikas.jpg',
    bio: 'Logistics and event management.'
  },
  {
    name: 'Vikas Gupta',
    role: 'Operations',
    image: '/team/vikas.jpg',
    bio: 'Logistics and event management.'
  },
  {
    name: 'Vikas Gupta',
    role: 'Operations',
    image: '/team/vikas.jpg',
    bio: 'Logistics and event management.'
  },
  // Add more team members as needed
];

export default function TeamSection() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Meet the Team</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-8 min-w-[600px]">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center border border-gray-200 dark:border-gray-700">
              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500" />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
