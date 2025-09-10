'use client';

import { useState, useEffect } from 'react';
import {
  Menu, X, Users, Trophy, Calendar, Upload, Code,
  Star, Clock, Github, ExternalLink, Twitter, Linkedin,
  Instagram, Mail, MapPin, Phone, ChevronRight, Heart, Sun, Moon,
  DollarSign, Award, Target, Zap, CheckCircle, ArrowRight,
  Building, Globe, Timer, UserPlus, FileText, Search, Filter,
  Play, BookOpen, ChevronDown, Lock, AtSign, GraduationCap
} from 'lucide-react';

export default function HackersUnityPlatform() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('hackathons');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [registrationEvent, setRegistrationEvent] = useState<Hackathon | null>(null);
  type Hackathon = typeof hackathons[number];
  const [selectedEvent, setSelectedEvent] = useState<Hackathon | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [authUser, setAuthUser] = useState<{ email: string; name: string } | null>(null);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for hackathons and events
  const hackathons = [
    {
      id: 1,
      title: 'Hacker\'s Unity 2025 Spring Hackathon',
      status: 'live',
      description: 'Build innovative solutions for real-world problems in 36 hours',
      startDate: '2025-03-29',
      endDate: '2025-03-30',
      registrationDeadline: '2025-03-25',
      prizePool: '₹1,50,000',
      participants: 420,
      maxParticipants: 500,
      tracks: ['AI/ML', 'Blockchain', 'IoT', 'Web3', 'FinTech'],
      sponsors: ['TechCorp', 'InnovateLabs', 'FutureVC'],
      image: '🚀',
      submissions: 0,
      location: 'Hybrid - Jaipur & Online',
      teamSize: '1-4 members',
      difficulty: 'Intermediate',
      type: 'Hackathon',
      highlights: [
        'Free food & accommodation',
        'Mentorship from industry experts',
        'Networking opportunities',
        'Swag & goodies'
      ]
    },
    {
      id: 2,
      title: 'AI Innovation Challenge 2025',
      status: 'upcoming',
      description: 'Leverage AI to create solutions that matter',
      startDate: '2025-04-15',
      endDate: '2025-04-16',
      registrationDeadline: '2025-04-10',
      prizePool: '₹2,00,000',
      participants: 150,
      maxParticipants: 300,
      tracks: ['Computer Vision', 'NLP', 'GenAI', 'ML Ops'],
      sponsors: ['AI Labs', 'DeepTech', 'Neural Networks Inc'],
      image: '🤖',
      submissions: 0,
      location: 'Online',
      teamSize: '1-3 members',
      difficulty: 'Advanced',
      type: 'Challenge',
      highlights: [
        'GPU credits worth ₹50,000',
        'Direct hiring opportunities',
        'Publication opportunities',
        'Industry mentorship'
      ]
    },
    {
      id: 3,
      title: 'Blockchain Builders Bootcamp',
      status: 'upcoming',
      description: 'Create the next generation of decentralized applications',
      startDate: '2025-05-20',
      endDate: '2025-05-22',
      registrationDeadline: '2025-05-15',
      prizePool: '₹3,00,000',
      participants: 80,
      maxParticipants: 200,
      tracks: ['DeFi', 'NFTs', 'Smart Contracts', 'DAOs'],
      sponsors: ['CryptoVentures', 'Web3 Foundation'],
      image: '⛓️',
      submissions: 0,
      location: 'Mumbai',
      teamSize: '2-5 members',
      difficulty: 'Beginner',
      type: 'Bootcamp',
      highlights: [
        'Token grants',
        'VC pitch opportunities',
        'Web3 job fair',
        'Expert workshops'
      ]
    },
    {
      id: 4,
      title: 'Winter Code Fest 2024',
      status: 'completed',
      description: 'The biggest coding festival of the year',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      registrationDeadline: '2024-12-15',
      prizePool: '₹5,00,000',
      participants: 850,
      maxParticipants: 1000,
      tracks: ['Open Innovation', 'Healthcare', 'Education', 'Sustainability'],
      sponsors: ['MegaCorp', 'TechGiants', 'StartupHub'],
      image: '❄️',
      submissions: 234,
      location: 'Delhi NCR',
      teamSize: '1-4 members',
      difficulty: 'All Levels',
      type: 'Festival',
      winners: [
        { team: 'Code Warriors', project: 'EcoTrack', prize: '₹1,00,000' },
        { team: 'Tech Titans', project: 'HealthAI', prize: '₹75,000' },
        { team: 'Innovation Squad', project: 'EduVerse', prize: '₹50,000' }
      ]
    },
    {id: 5,
      title: 'Hacker\'s Unity 2025 Spring Hackathon',
      status: 'live',
      description: 'Build innovative solutions for real-world problems in 36 hours',
      startDate: '2025-03-29',
      endDate: '2025-03-30',
      registrationDeadline: '2025-03-25',
      prizePool: '₹1,50,000',
      participants: 420,
      maxParticipants: 500,
      tracks: ['AI/ML', 'Blockchain', 'IoT', 'Web3', 'FinTech'],
      sponsors: ['TechCorp', 'InnovateLabs', 'FutureVC'],
      image: '🚀',
      submissions: 0,
      location: 'Hybrid - Jaipur & Online',
      teamSize: '1-4 members',
      difficulty: 'Intermediate',
      type: 'Hackathon',
      highlights: [
        'Free food & accommodation',
        'Mentorship from industry experts',
        'Networking opportunities',
        'Swag & goodies'
      ]
}
  ];

  const getTimeUntil = (date: string): { days: number; hours: number; minutes: number } => {
    if (!isClient) return { days: 0, hours: 0, minutes: 0 };

    const eventDate = new Date(date);
    const now = currentTime.getTime();
    const target = eventDate.getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return { days, hours, minutes };
    }
    return { days: 0, hours: 0, minutes: 0 };
  };

  const filteredHackathons = hackathons.filter(h => {
    const matchesStatus = filterStatus === 'all' || h.status === filterStatus;
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const themeClasses = {
     /* ternary operator for theme switch */
    container: isDarkMode ? 'bg-[#0f172a] text-white' : 'bg-white text-zinc-50',
    // colour of header of the website in light and dark mode
    header: isDarkMode ? 'bg-[#0f172a]/95 border-[#1e293b] backdrop-blur-lg' : 'bg-stone-900 border-yellow-600 backdrop-blur-lg',
    // colour of sidebar when open in mobile
    sidebar: isDarkMode ? 'bg-[#1e293b] border-[#1e293b]' : 'bg-white border-gray-100',
    // color of card section (hackathon card, event card)
    card: `${isDarkMode ? 'bg-[#1e293b] border-[#262f45] hover:border-blue-500': 'bg-stone-900 border-purple-500 hover:border-pink-500'} // Light mode = yellow card, purple border, pink hover border
  rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1`,

    button: {
    // primary is for sign-in and registration button
      primary: isDarkMode? "bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5": "bg-stone-500 hover:bg-stone-900 text-white transition-all duration-200 px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5"
,
      // seconday is for view results
      secondary: `${isDarkMode ? 'bg-[#262f45] hover:bg-[#334155]' : 'bg-stone-950 hover:bg-gray-200'} text-inherit transition-all duration-200 px-4 py-2 rounded-lg font-medium`,

      // outline is for other buttons like "detils button on the card"
      outline: `border ${isDarkMode ? 'border-[#334155] hover:bg-stone-900' : 'border-stone-200 hover:bg-stone-600'} transition-all duration-200 px-4 py-2 rounded-lg font-medium`
    },

    // input is for search bars
    input: `w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
      isDarkMode 
        ? 'bg-[#1e293b] border-[#334155] text-white placeholder-gray-400' 
        : 'bg-white border-stone-900 text-stone-900 placeholder-gray-400'
    }`,

    // gradient as the name suggest is for the centered gradient element in our website
  gradient: {
  primary: isDarkMode
    ? 'bg-blue-700'
    : 'bg-stone-200 border border-stone-400',

  accent: isDarkMode
    ? 'bg-indigo-600'
    : 'bg-stone-300 border border-stone-500'
}

,

// glass is for colour in the gradient, footer, and card
    glass: isDarkMode 
  ? 'bg-[#1e293b]/50 backdrop-blur-md border border-white/5' 
  : 'bg-pink-300/70 backdrop-blur-md border border-yellow-500',

text: {
  primary: isDarkMode 
    ? 'text-white' 
    : 'text-lime-700',   // it is for text on the card box
  secondary: isDarkMode 
    ? 'text-gray-300' 
    : 'text-white',   // it is for text in the footer and card box
  muted: isDarkMode 
    ? 'text-gray-400' 
    : 'text-yellow-600'  // it is for the text on the card box
}

  };

  interface EventDetailsModalProps {
    event: Hackathon;
    onClose: () => void;
  }
  const EventDetailsModal = ({ event, onClose }: EventDetailsModalProps) => {
    if (!event) return null;

    const timeUntil = getTimeUntil(event.startDate);
    const registrationTime = getTimeUntil(event.registrationDeadline);
    const isRegistrationOpen = registrationTime.days > 0 || registrationTime.hours > 0;

    return (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className={`${themeClasses.card} max-w-4xl w-full my-8 shadow-2xl`}>
          {/* Header */}
          <div className={`relative ${themeClasses.gradient.primary} text-white p-6 rounded-t-xl`}>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-3xl">{event.image}</div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${event.status === 'live' ? 'bg-green-500' :
                      event.status === 'upcoming' ? 'bg-blue-500' :
                        'bg-gray-500'
                      } text-white`}>
                      {event.status}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {event.type}
                    </span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                      {event.difficulty}
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                <p className="opacity-90 text-sm">{event.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors ml-4"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Quick Stats ------ it is for the small boxes when you click on any card */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="text-lg font-bold text-green-700 dark:text-green-400">{event.prizePool}</div>
                <div className="text-xs text-green-600 dark:text-green-500">Prize Pool</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="text-lg font-bold text-blue-700 dark:text-blue-400">{event.participants}</div>
                <div className="text-xs text-blue-600 dark:text-blue-500">Registered</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <MapPin className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="text-lg font-bold text-purple-700 dark:text-purple-400">{event.location.split(' - ')[0]}</div>
                <div className="text-xs text-purple-600 dark:text-purple-500">Location</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <Users className="w-6 h-6 mx-auto mb-2 text-orange-600" />
                <div className="text-lg font-bold text-orange-700 dark:text-orange-400">{event.teamSize}</div>
                <div className="text-xs text-orange-600 dark:text-orange-500">Team Size</div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Event Timeline
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                  <div>
                    <div className="font-semibold text-orange-800 dark:text-orange-400">Registration Deadline</div>
                    <div className="text-sm text-orange-600 dark:text-orange-500">{new Date(event.registrationDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  {isRegistrationOpen && (
                    <div className="text-right">
                      <div className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                        {registrationTime.days}d {registrationTime.hours}h left
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div>
                    <div className="font-semibold text-blue-800 dark:text-blue-400">Event Starts</div>
                    <div className="text-sm text-blue-600 dark:text-blue-500">{new Date(event.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  {event.status === 'upcoming' && (
                    <div className="text-right">
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                        {timeUntil.days}d {timeUntil.hours}h to go
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                  <div>
                    <div className="font-semibold text-green-800 dark:text-green-400">Event Ends</div>
                    <div className="text-sm text-green-600 dark:text-green-500">{new Date(event.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tracks */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-500" />
                  Competition Tracks
                </h3>
                <div className="space-y-2">
                  {event.tracks.map((track: string) => (
                    <div key={track} className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <Code className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-300">{track}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Event Benefits
                </h3>
                <div className="space-y-2">
                  {event.highlights?.map((highlight: string) => (
                    <div key={highlight} className="flex items-center p-2">
                      <CheckCircle className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sponsors */}
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-blue-500" />
                Event Sponsors
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.sponsors.map((sponsor: string) => (
                  <div key={sponsor} className={`p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg border text-center font-semibold`}>
                    {sponsor}
                  </div>
                ))}
              </div>
            </div>

            {/* Winners (for completed events) */}
            {event.status === 'completed' && event.winners && (
              <div>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Competition Winners
                </h3>
                <div className="space-y-3">
                  {event.winners.map((winner: { team: string; project: string; prize: string }, index: number) => (
                    <div key={index} className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg border`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{winner.team}</div>
                          <div className="text-sm text-gray-500">{winner.project}</div>
                        </div>
                      </div>
                      <span className="text-green-600 font-bold">{winner.prize}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}



            {/* Action Buttons ------ signin to register, register for an event, submit projects, view all submission, view guidelines */}
            <div className="flex gap-4 pt-4 border-t">
              {!authUser ? (
                <button 
                  onClick={() => {
                    onClose();
                    setShowAuthModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign in to Register</span>
                </button>
              ) : !registeredEvents.includes(event.id) ? (
                <button 
                  onClick={() => {
                    onClose();
                    setRegistrationEvent(event);
                    setShowRegistrationModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Register for Event</span>
                </button>
              ) : (
                <button 
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Upload className="w-5 h-5" />
                  <span>Submit Project</span>
                </button>
              )}
              {event.status === 'completed' && (
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg">
                  <ExternalLink className="w-5 h-5" />
                  <span>View All Submissions</span>
                </button>
              )}
              <button className={`px-6 py-4 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 border ${isDarkMode ? 'bg-gray-800 border-gray-600 hover:bg-gray-700' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}>
                <FileText className="w-5 h-5" />
                <span>View Guidelines</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  interface EventCardProps {
    event: Hackathon;
    onViewDetails: (event: Hackathon) => void;
  }
  const EventCard = ({ event, onViewDetails }: EventCardProps) => {
    const timeUntil = getTimeUntil(event.startDate);
    const registrationTime = getTimeUntil(event.registrationDeadline);
    const isRegistrationOpen = registrationTime.days > 0 || registrationTime.hours > 0;

    return (
      <div className={`${themeClasses.card} p-6 cursor-pointer`}
        onClick={() => onViewDetails(event)}>
        {/* Event Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{event.image}</div>
            <div className="flex flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${event.status === 'live' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                event.status === 'upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                {event.status}
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 rounded-full text-xs font-semibold">
                {event.type}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-600 font-bold text-lg">{event.prizePool}</div>
            <div className={`text-xs ${themeClasses.text.muted}`}>Prize Pool</div>
          </div>
        </div>

        <h3 className={`text-xl font-bold mb-2 ${themeClasses.text.primary}`}>{event.title}</h3>
        <p className={`${themeClasses.text.secondary} mb-4 text-sm`}>{event.description}</p>

        {/* Event Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className={`${themeClasses.glass} rounded-lg p-3 flex items-center space-x-3`}>
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <div className={`text-sm font-medium ${themeClasses.text.secondary}`}>Participants</div>
              <div className={`text-sm font-bold ${themeClasses.text.primary}`}>
                {event.participants}/{event.maxParticipants}
              </div>
            </div>
          </div>
          <div className={`${themeClasses.glass} rounded-lg p-3 flex items-center space-x-3`}>
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className={`text-sm font-medium ${themeClasses.text.secondary}`}>Location</div>
              <div className={`text-sm font-bold ${themeClasses.text.primary}`}>{event.location.split(' - ')[0]}</div>
            </div>
          </div>
          <div className={`${themeClasses.glass} rounded-lg p-3 flex items-center space-x-3`}>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <div className={`text-sm font-medium ${themeClasses.text.secondary}`}>Date</div>
              <div className={`text-sm font-bold ${themeClasses.text.primary}`}>
                {new Date(event.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          <div className={`${themeClasses.glass} rounded-lg p-3 flex items-center space-x-3`}>
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <div className={`text-sm font-medium ${themeClasses.text.secondary}`}>Team Size</div>
              <div className={`text-sm font-bold ${themeClasses.text.primary}`}>{event.teamSize}</div>
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tracks.slice(0, 3).map((track: string) => (
            <span key={track} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              {track}
            </span>
          ))}
          {event.tracks.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
              +{event.tracks.length - 3} more
            </span>
          )}
        </div>

        {/* Time Until Event */}
        {event.status === 'upcoming' && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
            <div className="text-blue-800 dark:text-blue-300 text-sm font-semibold mb-1">
              {isRegistrationOpen ? 'Registration closes in:' : 'Event starts in:'}
            </div>
            <div className="text-blue-600 dark:text-blue-400 font-bold">
              {isRegistrationOpen
                ? `${registrationTime.days}d ${registrationTime.hours}h ${registrationTime.minutes}m`
                : `${timeUntil.days}d ${timeUntil.hours}h ${timeUntil.minutes}m`
              }
            </div>
          </div>
        )}

        {event.status === 'live' && (
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 dark:text-green-300 text-sm font-semibold">Event is LIVE!</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          {!authUser ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowAuthModal(true);
              }}
              className={`flex-1 ${themeClasses.button.primary}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign in to Register</span>
            </button>
          ) : !registeredEvents.includes(event.id) ? (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setRegistrationEvent(event);
                setShowRegistrationModal(true);
              }}
              className={`flex-1 ${themeClasses.button.primary}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register for Event</span>
            </button>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(event);
              }}
              className={`flex-1 ${themeClasses.gradient.primary} text-white btn`}
            >
              <Upload className="w-4 h-4" />
              <span>Submit Project</span>
            </button>
          )}
          {event.status === 'completed' && (
            <button 
              className={`flex-1 ${themeClasses.button.secondary}`}
            >
              <Trophy className="w-4 h-4" />
              <span>View Results</span>
            </button>
          )}
          <button className={themeClasses.button.outline}>
            <ChevronRight className="w-4 h-4" />
            <span>Details</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${themeClasses.container}`}>
      {/* Header */}
      <header >
              <header className={`sticky top-0 z-40 ${themeClasses.header} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Hacker's Unity
              </div>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('hackathons')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'hackathons'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : `${themeClasses.text.secondary} hover:bg-primary/10`
                }`}
              >
                <Code className="w-5 h-5" />
                <span>All Events</span>
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'leaderboard'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : `${themeClasses.text.secondary} hover:bg-primary/10`
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span>Leaderboard</span>
              </button>
              <button
                onClick={() => setActiveTab('submissions')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'submissions'
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : `${themeClasses.text.secondary} hover:bg-primary/10`
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>My Projects</span>
              </button>
            </nav>

            {/* Right: Theme and Auth */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {authUser ? (
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-medium ${themeClasses.text.secondary}`}>
                    {authUser.name}
                  </span>
                  <button
                    onClick={() => setAuthUser(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={themeClasses.button.primary}
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      </header>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className={`fixed right-0 top-0 h-full w-64 ${themeClasses.sidebar} shadow-lg p-4`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold">Menu</h2>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="space-y-2">
              {[
                { id: 'hackathons', label: 'All Events', icon: Code },
                { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                { id: 'submissions', label: 'My Projects', icon: FileText }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-left transition-all ${activeTab === item.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : themeClasses.text.primary
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'hackathons' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className={`relative overflow-hidden rounded-2xl ${themeClasses.gradient.primary}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-600/40 backdrop-blur-[2px]"></div>
              <div className="relative text-center py-16 px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 animate-float">
                  Build the Future
                </h1>
                <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                  Join hackathons, compete with the best, and turn your ideas into reality
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {[
                    { label: 'Live Events', value: hackathons.filter(h => h.status === 'live').length, icon: Zap },
                    { label: 'Participants', value: '2.5K+', icon: Users },
                    { label: 'Prize Money', value: '₹10L+', icon: DollarSign },
                    { label: 'Projects', value: '500+', icon: Code }
                  ].map((stat) => (
                    <div key={stat.label} className={`${themeClasses.glass} rounded-xl p-4 text-center`}>
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/90" />
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events, technologies, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['all', 'live', 'upcoming', 'completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-3 rounded-lg font-semibold capitalize transition-all ${filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : `${themeClasses.text.secondary} border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`
                        }`}
                    >
                      {status === 'all' ? 'All Events' : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHackathons.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={setSelectedEvent}
                />
              ))}
            </div>

            {filteredHackathons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Top performers across all hackathons</p>
            </div>

            <div className={`${themeClasses.card} rounded-xl p-8 text-center`}>
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
              <p className="text-gray-600 dark:text-gray-400">We're working on an amazing leaderboard system to showcase top hackers and their achievements.</p>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">My Projects</h1>
              <p className="text-gray-600 dark:text-gray-400">Track your hackathon submissions and progress</p>
            </div>

            <div className={`${themeClasses.card} rounded-xl p-8 text-center`}>
              <FileText className="w-16 h-16 mx-auto mb-4 text-blue-500" />
              <h2 className="text-2xl font-bold mb-2">No Submissions Yet</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Join a hackathon and start building amazing projects!</p>
              <button
                onClick={() => setActiveTab('hackathons')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
              >
                Browse Events
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${themeClasses.card} rounded-xl max-w-md w-full p-6 shadow-2xl`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {isSignIn ? 'Sign In' : 'Create Account'}
              </h2>
              <button 
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError('');
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              // Mock authentication
              const form = e.target as HTMLFormElement;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const password = (form.elements.namedItem('password') as HTMLInputElement).value;
              const name = isSignIn ? email.split('@')[0] : (form.elements.namedItem('name') as HTMLInputElement)?.value;

              // Simple validation
              if (!email || !password || (!isSignIn && !name)) {
                setAuthError('Please fill in all fields');
                return;
              }

              // Mock successful auth
              setAuthUser({ email, name: name || email.split('@')[0] });
              setShowAuthModal(false);
              setAuthError('');
            }}>
              <div className="space-y-4">
                {!isSignIn && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe"
                      className={`w-full py-3 px-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">Email/Phone</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="email"
                      placeholder="Enter your email or phone"
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="password"
                      name="password" 
                      placeholder="Enter your password"
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
              </div>

              {authError && (
                <div className="mt-4 text-red-500 text-sm">
                  {authError}
                </div>
              )}

              <button 
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <span>{isSignIn ? 'Sign In' : 'Create Account'}</span>
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Registration Modal */}
      {showRegistrationModal && registrationEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${themeClasses.card} rounded-xl max-w-md w-full p-6 shadow-2xl`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Register for {registrationEvent.title}</h2>
              <button 
                onClick={() => setShowRegistrationModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!authUser) return;

              const form = e.target as HTMLFormElement;
              const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
              const college = (form.elements.namedItem('college') as HTMLInputElement).value;

              // Validate inputs
              if (!phone || !college) {
                setAuthError('Please fill in all fields');
                return;
              }

              // Add event to registered events
              setRegisteredEvents(prev => [...prev, registrationEvent.id]);
              setShowRegistrationModal(false);
              setAuthError('');
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    value={authUser?.email || ''}
                    disabled
                    className={`w-full py-3 px-4 rounded-lg border bg-gray-100 ${themeClasses.input}`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                      pattern="[0-9]{10}"
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">College/University Name</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="text"
                      name="college" 
                      placeholder="Enter your college name"
                      required
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${themeClasses.card} rounded-xl max-w-md w-full p-6 shadow-2xl`}>
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {isSignIn ? 'Sign In' : 'Create Account'}
              </h2>
              <button 
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError('');
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Auth Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const email = (form.elements.namedItem('email') as HTMLInputElement).value;
              const password = (form.elements.namedItem('password') as HTMLInputElement).value;
              const name = isSignIn ? email.split('@')[0] : (form.elements.namedItem('name') as HTMLInputElement)?.value;

              // Simple validation
              if (!email || !password || (!isSignIn && !name)) {
                setAuthError('Please fill in all fields');
                return;
              }

              // Mock successful auth
              setAuthUser({ email, name: name || email.split('@')[0] });
              setShowAuthModal(false);
              setAuthError('');
            }}>
              <div className="space-y-4">
                {!isSignIn && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="John Doe"
                      className={`w-full py-3 px-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-1">Email/Phone</label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      name="email"
                      placeholder="Enter your email or phone"
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input 
                      type="password"
                      name="password" 
                      placeholder="Enter your password"
                      className={`w-full py-3 pl-10 pr-4 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${themeClasses.input}`}
                    />
                  </div>
                </div>
              </div>

              {authError && (
                <div className="mt-4 text-red-500 text-sm">
                  {authError}
                </div>
              )}

              <button 
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
              >
                <span>{isSignIn ? 'Sign In' : 'Create Account'}</span>
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsSignIn(!isSignIn)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {isSignIn ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`${themeClasses.header} border-t mt-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                Hacker's Unity
              </div>
              <p className={`${themeClasses.text.secondary} mb-4 max-w-md`}>
                Empowering developers and innovators to build the future through hackathons, competitions, and collaborative projects.
              </p>
              <div className="flex space-x-4">
                {[Github, Twitter, Linkedin, Instagram].map((Icon, index) => (
                  <button key={index} className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <div className="space-y-2">
                {['Events', 'Leaderboard', 'Community', 'Resources'].map(item => (
                  <button key={item} className={`block ${themeClasses.text.secondary} hover:text-blue-600 transition-colors`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className={`flex items-center space-x-2 ${themeClasses.text.secondary}`}>
                  <Mail className="w-4 h-4" />
                  <span><a href='hackerunity.community@gmail.com'>hackerunity.community@gmail.com</a></span>
                </div>
                <div className={`flex items-center space-x-2 ${themeClasses.text.secondary}`}>
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className={`flex items-center space-x-2 ${themeClasses.text.secondary}`}>
                  <MapPin className="w-4 h-4" />
                  <span>Jaipur, Rajasthan</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} pt-8 mt-8 text-center ${themeClasses.text.muted}`}>
            <p>&copy; 2025 Hacker's Unity. All rights reserved. Built with ❤️ for the developer community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}