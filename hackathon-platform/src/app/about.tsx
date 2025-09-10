import React from 'react';

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center">About Hacker's Unity</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 text-center">
        Hacker's Unity is a platform dedicated to empowering developers, designers, and innovators through world-class hackathons and events. Our mission is to foster collaboration, creativity, and real-world impact.
      </p>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Founded by passionate technologists, we bring together a diverse community to solve real problems, learn new skills, and build lasting connections. Our team consists of experienced organizers, mentors, and industry leaders.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Achievements</h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
          <li>Hosted 10+ national and international hackathons since 2022</li>
          <li>Over 5,000 participants and 1,000+ projects submitted</li>
          <li>Partnered with 20+ leading tech companies and universities</li>
          <li>Distributed ₹20L+ in prizes and grants</li>
          <li>Enabled 50+ teams to launch startups or secure jobs</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-gray-600 dark:text-gray-400">
          We believe in the power of community and technology to change the world. Join us to be part of the next big innovation journey!
        </p>
      </section>
    </main>
  );
}
