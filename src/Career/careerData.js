const careerData = [
  {
    id: 1,
    category: "Technology & Innovation",
    image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg?t=st=1725524745~exp=1725528345~hmac=54cbebefacb0ecc942718b56086af022780addcb2d7a682d53abecb1d6e3598b&w=740",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "Cloud Engineer", "DevOps Engineer", "UX/UI Designer", "Full Stack Developer", "Blockchain Developer", "IoT Specialist", "Systems Architect", "Robotics Engineer", "Network Engineer", "Hardware Engineer", "Technology Consultant"]
  },
  {
    id: 2,
    category: "Health & Wellness",
    image: "https://img.freepik.com/free-vector/flat-illustration-doctors-nurses_23-2148910588.jpg?t=st=1725524960~exp=1725528560~hmac=96da23ec8910b1f4678c6bfa3e3b97447321458a84f7836e9cde6906e3b24eaf&w=740",
    careers: ["Nurse", "Nutritionist", "Fitness Trainer", "Physical Therapist", "Occupational Therapist", "Medical Assistant", "Chiropractor", "Health Coach", "Speech-Language Pathologist", "Yoga Instructor", "Mental Health Counselor", "Personal Trainer", "Public Health Administrator", "Dental Hygienist", "Massage Therapist"]
  },
  {
    id: 3,
    category: "Environmental & Sustainability",
    image: "https://img.freepik.com/premium-vector/people-working-concept-illustration_958800-152317.jpg?w=740",
    careers: ["Environmental Scientist", "Sustainability Consultant", "Ecologist", "Renewable Energy Specialist", "Conservation Biologist", "Climate Change Analyst", "Environmental Engineer", "Wildlife Manager", "Green Building Architect", "Water Resource Specialist", "Sustainable Agriculture Specialist", "Environmental Policy Analyst", "Waste Management Specialist", "Energy Efficiency Analyst", "Environmental Health and Safety Officer"]
  },
  {
    id: 4,
    category: "Creative Arts & Design",
    image: "https://img.freepik.com/premium-vector/man-is-standing-front-tv-picture-man-with-hat_1013341-259018.jpg?w=740",
    careers: ["Graphic Designer", "Fashion Designer", "Interior Designer", "Illustrator", "Animator", "Art Director", "Photographer", "Industrial Designer", "Video Game Designer", "Textile Designer", "Fine Artist", "Jewelry Designer", "Set Designer", "Web Designer", "Multimedia Artist", "User Experience (UX) Designer"]
  },
  {
    id: 5,
    category: "Business & Entrepreneurship",
    image: "https://img.freepik.com/free-vector/hand-drawn-business-team-communication_52683-76426.jpg?t=st=1725525471~exp=1725529071~hmac=466d3ec69b16eea20dd15cbbca219cc3228bf5834db95c2209bed6e2e059b771&w=740",
    careers: ["Entrepreneur", "Business Analyst", "Marketing Manager", "Sales Manager", "Business Consultant", "Product Manager", "Finance Manager", "Human Resources Manager", "Operations Manager", "Supply Chain Manager", "Investment Banker", "Financial Planner", "Venture Capitalist", "Business Development Manager", "Public Relations Manager", "Corporate Strategist"]
  },
  {
    id: 6,
    category: "Analytical & Research-Oriented",
    image: "https://img.freepik.com/premium-vector/business-analysts-flat-design-illustration_483364-2314.jpg?w=740",
    careers: ["Data Scientist", "Statistician", "Market Research Analyst", "Operations Research Analyst", "Policy Analyst", "Research Scientist", "Economist", "Biostatistician", "Business Intelligence Analyst", "Financial Analyst", "Quantitative Analyst", "Clinical Researcher", "Research Engineer", "Operations Analyst", "Actuary", "Academic Researcher"]
  },
  
  {
    id: 7,
    category: "Interpersonal & Communication",
    image: "https://img.freepik.com/free-vector/online-interview-employee-employer_23-2148620898.jpg?t=st=1725525622~exp=1725529222~hmac=f06bc01d573c8b1b310b0872c0013c1c2032c5ea2a71c73e2e7297390a7b1bf1&w=740",
    careers: ["Public Relations Specialist", "Corporate Communications Manager", "Mediator", "Human Resources Manager", "Sales Representative", "Event Planner", "Customer Success Manager", "Recruiter", "Journalist", "Speech Therapist", "Motivational Speaker", "Life Coach", "Counselor", "Crisis Communication Specialist", "Public Speaking Coach"]
  },
  {
    id: 8,
    category: "Technical & Mechanical",
    image: "https://img.freepik.com/premium-vector/human-machine-interface_951778-33575.jpg?w=740",
    careers: ["Mechanical Engineer", "Automotive Technician", "Robotics Engineer", "Aerospace Engineer", "Industrial Machinery Mechanic", "HVAC Technician", "Manufacturing Engineer", "Mechatronics Technician", "Marine Engineer", "Tool and Die Maker", "Welding Technician", "Civil Engineering Technician", "Automotive Designer", "Maintenance Engineer", "CNC Machinist"]
  },
  {
    id: 9,
    category: "Outdoor & Interest-based",
    image: "https://img.freepik.com/premium-vector/poster-man-with-backpack-camera-with-music-notes-it_608297-39972.jpg?w=740",
    careers: ["Wildlife Biologist", "Park Ranger", "Adventure Tour Guide", "Landscape Architect", "Environmental Educator", "Marine Biologist", "Forest Conservationist", "Archaeologist", "Outdoor Educator", "Ecotourism Specialist", "Professional Athlete", "Travel Blogger", "Horticulturist", "Wildlife Photographer", "Fishing Guide"]
  },
  {
    id: 10,
    category: "Office & Desk-Based",
    image: "https://img.freepik.com/free-vector/tax-preparation-concept-illustration_114360-19336.jpg?t=st=1725526345~exp=1725529945~hmac=f5287f406ef1f24147535dfadb95aca6b79425d9dd9c45a305ace0e945804afb&w=740",
    careers: ["Administrative Assistant", "Accountant", "Human Resources Manager", "Data Analyst", "Project Manager", "Legal Assistant", "Customer Service Representative", "Financial Analyst", "Marketing Coordinator", "IT Support Specialist", "Office Manager", "Executive Assistant", "Content Writer", "Paralegal", "Sales Coordinator"]
  },
  {
    id: 11,
    category: "Remote & Flexible",
    image: "https://img.freepik.com/free-vector/freelancer-concept-illustration_114360-7590.jpg?t=st=1725526420~exp=1725530020~hmac=352db8a705bf830fdb89985c178efc17a32c4cc7fe74d731022615cd733a95d8&w=740",
    careers: ["Freelance Writer", "Web Developer", "Virtual Assistant", "Graphic Designer", "Online Tutor", "Social Media Manager", "Digital Marketer", "Content Creator", "Customer Support Specialist", "Software Engineer", "SEO Specialist", "Transcriptionist", "UX/UI Designer", "Affiliate Marketer", "Consultant"]
  },
  {
    id: 12,
    category: "High Social Impact",
    image: "https://img.freepik.com/free-vector/hand-drawn-community-spirit-illustration_23-2150188732.jpg?t=st=1725526462~exp=1725530062~hmac=d696d9dab7b5915b704bbac3e8adff55abe7d3ebf58bf6c60c88ae0dc14e3292&w=740",
    careers: ["Social Worker", "Public Health Specialist", "Nonprofit Manager", "Human Rights Advocate", "Community Organizer", "Environmental Scientist", "Charity Coordinator", "Educational Outreach Coordinator", "Policy Analyst", "Counselor", "Sustainability Consultant", "Mental Health Professional", "Development Specialist", "Advocacy Coordinator", "Disaster Relief Worker"]
  },
  {
    id: 13,
    category: "Innovation & Future-Oriented",
    image: "https://img.freepik.com/free-vector/flat-hand-drawn-people-starting-business-project-with-light-bulb_23-2148848896.jpg?t=st=1725528685~exp=1725532285~hmac=8e97bd3ad8e16b6cba0ea0cc5adada2d996dd2dbea848f78ff2033488e0ba8bb&w=740",
    careers: ["Futurist", "Innovation Manager", "Product Designer", "Technology Strategist", "Research Scientist", "Data Analyst", "AI Specialist", "Blockchain Developer", "R&D Engineer", "User Experience (UX) Researcher", "Smart City Planner", "Sustainable Energy Consultant", "Venture Capital Analyst", "Robotics Engineer", "Genomics Specialist"]
  },
  {
    id: 14,
    category: "Global Careers",
    image: "https://img.freepik.com/free-vector/booking-flight-tickets-online-flat-vector-concept_81522-1139.jpg?t=st=1725528759~exp=1725532359~hmac=653ff778c9e91b24312109741d5b17f175ff4805266b9a9858919483184d4784&w=740",
    careers: ["International Relations Specialist", "Global Development Advisor", "Diplomat", "Global Marketing Manager", "International Business Consultant", "Foreign Service Officer", "Cross-Cultural Trainer", "Global Supply Chain Manager", "International Trade Specialist", "Global Health Consultant", "NGO Program Coordinator", "International Policy Analyst", "Global Project Manager", "Expatriate Consultant", "Global Legal Advisor"]
  },
  {
    id: 15,
    category: "Government Services",
    image: "https://img.freepik.com/free-vector/judge-concept-illustration_114360-1909.jpg?t=st=1725529015~exp=1725532615~hmac=51d708911b2c64527416af13f4729ca4ed0064250328fcbc19c1f0cb6974d725&w=740",
    careers: ["Public Policy Analyst", "City Planner", "Government Affairs Specialist", "Regulatory Compliance Officer", "Social Services Manager", "Public Health Administrator", "Legislative Assistant", "Urban Development Specialist", "Economic Development Coordinator", "Law Enforcement Officer", "Public Information Officer", "Public Administrator", "Government Program Manager", "Tax Consultant", "Diplomatic Service Officer"]
  }
];

export default careerData;
