const conferences = [
  {
    id: 1,
    title: "AI Summit 2026",
    domain: "AI & Machine Learning",
    date: "Aug 12, 2026",
    dateISO: "2026-08-12",
    location: "Kuala Lumpur",
    image :"https://wallpapercat.com/w/full/7/c/a/2307596-2000x1664-desktop-hd-art-deco-wallpaper-image.jpg",
    tag: "Trending",
    speakers: [
      { name: "Dr. Sarah Lim", topic: "The Future of Generative AI" },
      { name: "Prof. Wei Chen", topic: "AI Ethics in Practice" },
    ],
    agenda: [
      { time: "9:00 AM", session: "Opening Keynote" },
      { time: "10:30 AM", session: "AI Ethics Panel" },
      { time: "1:00 PM", session: "Workshop: Building with LLMs" },
    ],
  },

  {
    id: 2,
    title: "Healthcare Innovation Expo",
    domain: "Medical & Healthcare",
    date: "Sep 3, 2026",
    dateISO: "2026-09-03",
    location: "Penang",
    image: "https://wallpapercat.com/w/full/2/7/c/2307591-2048x1466-desktop-hd-art-deco-background.jpg",
    tag: "Upcoming",
    speakers: [
      { name: "Dr. Emmanuel", topic: "Everything about Cancer" },
      { name: "Dr. Menat", topic: "What we can learn from Covid" },
    ],
    agenda: [
      { time: "9:00 AM", session: "Opening Keynote" },
      { time: "10:30 AM", session: "Healthcare Panel" },
      { time: "1:00 PM", session: "Q & A" },
    ],
  },

  {
    id: 3,
    title: "Startup & Business Forum",
    domain: "Business & Entrepreneurship",
    date: "Oct 20, 2026",
    dateISO: "2026-10-20",
    location: "Johor Bahru",
    image:"https://wallpapercat.com/w/full/a/e/1/2308322-1748x2480-samsung-hd-art-deco-background.jpg",
    tag: "Upcoming",
    speakers: [
      { name: "Prof. Aaron", topic: "Management and AI" },
      { name: "Prof. Dei", topic: "Starting Business" },
    ],
    agenda: [
      { time: "9:00 AM", session: "Opening Keynote" },
      { time: "10:30 AM", session: "Management and AI" },
      { time: "12:00 PM", session: "Starting Business" },
    ],
  },

  {
    id: 4,
    title: "Cloud & DevOps Conference",
    domain: "IT & Computing",
    date: "Nov 5, 2026",
    dateISO: "2026-11-05",
    location: "Kuala Lumpur",
    image:"https://wallpapercat.com/w/full/d/f/2/2307757-2000x2000-samsung-hd-art-deco-wallpaper-photo.jpg",
    tag: "Trending",
    speakers: [
      { name: "Prof. Lee", topic: "Future of Cloud computing" },
      { name: "Mr. Eric", topic: "Advanced software development" },
    ],
    agenda: [
      { time: "10:00 AM", session: "Opening Keynote" },
      { time: "10:30 AM", session: "Cloud computing" },
      { time: "11:30 PM", session: "Software tools showcase" },
    ],
  },

  {
    id: 5,
    title: "Green Energy Summit",
    domain: "Sustainability",
    date: "Dec 1, 2026",
    dateISO: "2026-12-01",
    location: "Cyberjaya",
    image:"https://wallpapercat.com/w/full/2/0/2/2307731-1528x2000-samsung-hd-art-deco-wallpaper.jpg",
    tag: "Upcoming",
    speakers: [
      { name: "Dr. Abdul", topic: "Reclaiming a dead Ecosystem" },
      { name: "Ms. Keishaf", topic: "Sustainability Opportunities" },
    ],
    agenda: [
      { time: "9:30 AM", session: "Opening" },
      { time: "10:30 AM", session: "First speaker" },
      { time: "12:00 PM", session: "Second speaker" },
    ],
  },

  {
    id: 6,
    title: "Machine Learning and GPT",
    domain: "AI & Machine Learning",
    date: "July 30, 2026",
    dateISO: "2026-07-30",
    location: "Kuala Lumpur",
    image:"https://wallpapercat.com/w/full/7/c/a/2307596-2000x1664-desktop-hd-art-deco-wallpaper-image.jpg",
    tag: "Upcoming",
    speakers: [
      { name: "Dr. Sarah Lim", topic: "Creating an AI model" },
      { name: "Dr. Fatima", topic: "AI assisted coding" },
    ],
    agenda: [
      { time: "9:00 AM", session: "Opening" },
      { time: "10:30 AM", session: "Creating AI model" },
      { time: "1:00 PM", session: "AI tools showcase" },
    ],
  },
  {
    id: 7,
    title: "FinTech & Blockchain Forum",
    domain: "Business & Entrepreneurship",
    date: "Jan 15, 2027",
    dateISO: "2027-01-15",
    location: "Singapore",
    image: "https://wallpapercat.com/w/full/a/e/1/2308322-1748x2480-samsung-hd-art-deco-background.jpg",
    speakers: [
      { name: "Marcus Reed", topic: "Decentralized Finance at Scale" },
      { name: "Priya Anand", topic: "Regulation in the Age of Crypto" },
    ],
    agenda: [
      { time: "9:30 AM", session: "Opening Remarks" },
      { time: "11:00 AM", session: "Panel: The Future of Digital Currency" },
      { time: "2:00 PM", session: "Workshop: Smart Contract Basics" },
    ],
  },
  {
    id: 8,
    title: "Neuroscience & Mental Health Congress",
    domain: "Medical & Healthcare",
    date: "Feb 22, 2027",
    dateISO: "2027-02-22",
    location: "Penang",
    image: "https://wallpapercat.com/w/full/2/7/c/2307591-2048x1466-desktop-hd-art-deco-background.jpg",
    speakers: [
      { name: "Dr. Farah Zainal", topic: "The Brain-Body Connection" },
      { name: "Dr. Tomás Rivera", topic: "New Frontiers in Depression Treatment" },
    ],
    agenda: [
      { time: "10:00 AM", session: "Keynote: Rethinking Mental Wellness" },
      { time: "12:30 PM", session: "Case Studies in Clinical Practice" },
      { time: "3:30 PM", session: "Roundtable: Community Mental Health" },
    ],
  },
  {
    id: 9,
    title: "Renewable Energy World Congress",
    domain: "Sustainability",
    date: "Mar 10, 2027",
    dateISO: "2027-03-10",
    location: "Kuala Lumpur",
    image: "https://wallpapercat.com/w/full/2/0/2/2307731-1528x2000-samsung-hd-art-deco-wallpaper.jpg",
    speakers: [
      { name: "Dr. Lim Wei Xuan", topic: "Solar Grid Innovations" },
      { name: "Amara Diallo", topic: "Financing the Green Transition" },
    ],
    agenda: [
      { time: "9:00 AM", session: "Opening Keynote" },
      { time: "11:30 AM", session: "Panel: Energy Storage Breakthroughs" },
      { time: "1:30 PM", session: "Site Tour: Solar Innovation Lab" },
    ],
  },
];

export default conferences;