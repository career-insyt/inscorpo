export interface EventItem {
  id: string;
  title: string;
  date: string;
  displayDate: string;
  time: string;
  location: string;
  category: "Competition" | "Workshop" | "Summit" | "Webinar";
  status: "Upcoming" | "Live Now" | "Past";
  description: string;
  host: string;
  iconName: "trophy" | "globe" | "chart" | "brain";
  capacity: number;
  registered: number;
  prize?: string;
  xpReward: number;
  passportStamp: string;
  credentialTitle: string;
  featured?: boolean;
  voucherCode?: string;
  tags: string[];
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "deckathon-2026",
    title: "Deckathon 2026 — Corporate PPT Championship",
    date: "2026-09-05",
    displayDate: "Sep 5, 2026",
    time: "10:00 AM – 5:00 PM",
    location: "BAU Campus, Mymensingh",
    category: "Competition",
    status: "Upcoming",
    description: "Bangladesh's premier corporate presentation competition. Build a real business pitch for a top MNC brief in 4 hours. Judges from Unilever, BRAC & GP.",
    host: "BAUBC × INSYT",
    iconName: "trophy",
    capacity: 200,
    registered: 178,
    prize: "৳50,000 + PPO Interviews",
    xpReward: 500,
    passportStamp: "DECK26",
    credentialTitle: "Deckathon 2026 Participant",
    featured: true,
    voucherCode: "DECKATHON26",
    tags: ["PPT", "Business Case", "MNC", "PPO"],
  },
  {
    id: "beyond-summit-26",
    title: "BEYOND Summit 2026 — Development Sector Career Fair",
    date: "2026-09-20",
    displayDate: "Sep 20, 2026",
    time: "9:00 AM – 6:00 PM",
    location: "Dhaka International Convention City",
    category: "Summit",
    status: "Upcoming",
    description: "Connecting 500+ students with UNDP, World Bank, BRAC, and icddr,b. Direct recruitment drives + UN fellowship info sessions.",
    host: "BEYOND Initiative × INSYT",
    iconName: "globe",
    capacity: 500,
    registered: 312,
    xpReward: 300,
    passportStamp: "BEYOND",
    credentialTitle: "BEYOND Summit 2026 Delegate",
    featured: true,
    voucherCode: "BEYOND26",
    tags: ["NGO", "UN", "Development", "Fellowship"],
  },
  {
    id: "excel-live-aug",
    title: "Excel Mastery Live Bootcamp — Financial Modeling",
    date: "2026-08-22",
    displayDate: "Aug 22, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Online (Zoom)",
    category: "Workshop",
    status: "Upcoming",
    description: "3-hour live session covering advanced Excel financial modeling, VLOOKUP arrays, PivotTables for corporate reporting.",
    host: "INSYT Academy",
    iconName: "chart",
    capacity: 100,
    registered: 87,
    xpReward: 150,
    passportStamp: "EXCEL",
    credentialTitle: "Advanced Excel Workshop",
    featured: false,
    tags: ["Excel", "Finance", "Live"],
  },
  {
    id: "ace-case-challenge",
    title: "ACE 2026 — Analytical Case Excellence",
    date: "2026-08-15",
    displayDate: "Aug 15, 2026",
    time: "Full Day Event",
    location: "IBA, University of Dhaka",
    category: "Competition",
    status: "Upcoming",
    description: "FMCG Case study championship with real business briefs from top MNCs. Open to all university students.",
    host: "IBA DSU × INSYT",
    iconName: "brain",
    capacity: 300,
    registered: 290,
    prize: "৳30,000 + Certificates",
    xpReward: 400,
    passportStamp: "ACE26",
    credentialTitle: "ACE Case Excellence Participant",
    featured: false,
    voucherCode: "ACE26",
    tags: ["Case Study", "FMCG", "Analytics"],
  },
];

export function getEventById(id: string): EventItem | undefined {
  return EVENTS_DATA.find((e) => e.id === id);
}
