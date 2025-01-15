const careerData = [
  {
    id: 1,
    category: "Technology & Innovation",
    image: "https://img.freepik.com/free-vector/hand-drawn-flat-design-rpa-illustration_23-2149277643.jpg?t=st=1725524745~exp=1725528345~hmac=54cbebefacb0ecc942718b56086af022780addcb2d7a682d53abecb1d6e3598b&w=740",
    careers: ["Software Engineer", "Data Scientist", "AI/ML Engineer", "Cybersecurity Analyst", "Cloud Engineer", "DevOps Engineer", "UX/UI Designer", "Full Stack Developer", "Blockchain Developer", "IoT Specialist", "Systems Architect", "Robotics Engineer", "Network Engineer", "Hardware Engineer", "Technology Consultant", "Product Manager", "Database Administrator", "Game Developer", "Digital Transformation Specialist", "Embedded Systems Engineer", "Mobile App Developer", "Computer Vision Engineer", "Virtual Reality Developer", "Machine Learning Researcher", "Big Data Engineer", "Quantum Computing Researcher", "Cyber Forensics Expert", "Ethical Hacker", "Bioinformatics Specialist", "GIS Analyst", "Telecommunications Engineer", "IT Support Specialist", "Technical Writer", "Innovation Strategist", "Data Engineer", "Computer Programmer", "Digital Marketing Specialist", "RPA Developer", "AI Ethicist", "Solutions Architect", "Agile Coach", "Information Security Officer"]

  },
  {
    id: 2,
    category: "Health & Wellness",
    image: "https://img.freepik.com/free-vector/flat-illustration-doctors-nurses_23-2148910588.jpg?t=st=1725524960~exp=1725528560~hmac=96da23ec8910b1f4678c6bfa3e3b97447321458a84f7836e9cde6906e3b24eaf&w=740",
    careers: [
      "Nurse", "Nutritionist", "Fitness Trainer", "Physical Therapist", "Occupational Therapist", "Medical Assistant", 
      "Chiropractor", "Health Coach", "Speech-Language Pathologist", "Yoga Instructor", "Mental Health Counselor", 
      "Personal Trainer", "Public Health Administrator", "Dental Hygienist", "Massage Therapist", "Pharmacist", 
      "Ayurveda Practitioner", "Homeopathic Doctor", "Dietitian", "Acupuncturist", "Psychologist", "Health Educator", 
      "Community Health Worker", "Optometrist", "Laboratory Technician", "General Physician", "Cardiologist", 
      "Dermatologist", "Orthopedic Surgeon", "Pediatrician", "Radiologist", "Ophthalmologist", "Dentist", "Oncologist", 
      "Gynecologist", "Endocrinologist", "ENT Specialist", "Psychiatrist", "Neurologist", "Pulmonologist", 
      "Nephrologist", "Gastroenterologist", "Anesthesiologist"
    ]
    
  },
  {
    id: 3,
    category: "Environmental & Sustainability",
    image: "https://img.freepik.com/premium-vector/people-working-concept-illustration_958800-152317.jpg?w=740",
    careers: [
      "Environmental Scientist", "Sustainability Consultant", "Conservation Scientist", "Ecologist", "Environmental Engineer", 
      "Wildlife Biologist", "Hydrologist", "Climate Change Analyst", "Renewable Energy Specialist", "Marine Biologist", 
      "Environmental Policy Analyst", "Sustainable Agriculture Specialist", "Urban Planner", "Forestry Manager", 
      "Environmental Educator", "Waste Management Specialist", "Sustainable Supply Chain Manager", "Environmental Health Officer", 
      "Energy Auditor", "Water Resource Specialist", "Recycling Coordinator", "Natural Resource Manager", 
      "Biodiversity Conservation Officer", "Carbon Analyst", "Environmental Compliance Inspector", "Green Building Architect", 
      "Environmental Chemist", "Soil Scientist", "Air Quality Specialist", "Sustainable Product Designer", 
      "Environmental Lawyer", "Geoenvironmental Engineer", "Ecosystem Restoration Specialist", "Sustainability Program Manager", 
      "Agroecologist", "Environmental Toxicologist", "Renewable Energy Project Developer", "Habitat Restoration Specialist", 
      "Sustainable Development Officer", "Conservation Geneticist"
    ]
    
  },
  {
    id: 4,
    category: "Creative Arts & Design",
    image: "https://img.freepik.com/premium-vector/man-is-standing-front-tv-picture-man-with-hat_1013341-259018.jpg?w=740",
    careers: ["Graphic Designer", "Fashion Designer", "Interior Designer", "Product Designer", "Web Designer", "UI/UX Designer", "Art Director", "Animator", "Illustrator", "Photographer", "Film Director", "Video Editor", "Sound Designer", "Copywriter", "Visual Effects Artist", "Textile Designer", "3D Modeler", "Creative Director", "Brand Strategist", "User Researcher", "Social Media Manager", "Game Designer", "Exhibition Designer", "Landscape Designer", "Advertising Executive", "Dancer", "Musician", "Theater Actor", "Fashion Stylist", "Art Curator", "Makeup Artist", "Culinary Artist", "Interior Stylist", "Printmaker", "Sculptor", "Calligrapher", "Tattoo Artist", "Set Designer", "Art Therapist"]

  },
  {
    id: 5,
    category: "Business & Entrepreneurship",
    image: "https://img.freepik.com/free-vector/hand-drawn-business-team-communication_52683-76426.jpg?t=st=1725525471~exp=1725529071~hmac=466d3ec69b16eea20dd15cbbca219cc3228bf5834db95c2209bed6e2e059b771&w=740",
    careers: ["Entrepreneur", "Business Analyst", "Management Consultant", "Marketing Manager", "Sales Manager", "Financial Analyst", "Product Manager", "Operations Manager", "Human Resources Manager", "Supply Chain Manager", "Project Manager", "Brand Manager", "Market Research Analyst", "Business Development Executive", "Investment Banker", "Accountant", "Risk Manager", "Insurance Underwriter", "Corporate Trainer", "Strategic Planner", "Retail Manager", "E-commerce Manager", "Digital Marketing Manager", "Franchise Manager", "Real Estate Manager", "Startup Advisor", "Event Manager", "Public Relations Specialist", "Social Media Strategist", "Data Analyst", "Compliance Officer", "Customer Service Manager", "Change Management Consultant", "Business Intelligence Analyst", "Procurement Manager", "Export Manager", "Product Marketing Manager", "Business Operations Manager", "Corporate Lawyer"]

  },
  {
    id: 6,
    category: "Analytical & Research-Oriented",
    image: "https://img.freepik.com/premium-vector/business-analysts-flat-design-illustration_483364-2314.jpg?w=740",
    careers: ["Research Scientist", "Market Research Analyst", "Statistical Analyst", "Data Analyst", "Business Analyst", "Quantitative Analyst", "Economist", "Behavioral Scientist", "Clinical Research Coordinator", "Public Health Researcher", "Sociologist", "Environmental Scientist", "Operations Research Analyst", "Policy Analyst", "Demographer", "Social Researcher", "Bioinformatics Analyst", "Psychometrician", "Forensic Scientist", "Health Services Researcher", "Artificial Intelligence Researcher", "Laboratory Technician", "Survey Researcher", "Epidemiologist", "Pharmaceutical Researcher", "Financial Analyst", "Market Data Analyst", "Risk Analyst", "Academic Researcher", "Technical Researcher", "Quality Assurance Analyst", "Information Scientist", "Geospatial Analyst", "Clinical Data Manager"]

  },
  
  {
    id: 7,
    category: "Interpersonal & Communication",
    image: "https://img.freepik.com/free-vector/online-interview-employee-employer_23-2148620898.jpg?t=st=1725525622~exp=1725529222~hmac=f06bc01d573c8b1b310b0872c0013c1c2032c5ea2a71c73e2e7297390a7b1bf1&w=740",
    careers: [ "Human Resources Manager", "Corporate Trainer", "Customer Service Manager", "Sales Executive", "Event Planner", "Counselor", "Mediator", "Marketing Communications Specialist", "Content Strategist", "Recruiter", "Community Manager", "Relationship Manager", "Diplomat", "Negotiation Specialist", "Communication Consultant", "Customer Experience Manager", "Training and Development Manager", "Crisis Manager", "Brand Ambassador", "Corporate Communications Manager",  "Public Speaker", "Political Consultant", "Customer Success Manager", "Media Planner", "Digital Content Creator", "Engagement Specialist", "Telecommunications Specialist", "Cultural Liaison", "Family Therapist", "Advocacy Director"]

  },
  {
    id: 8,
    category: "Technical & Mechanical",
    image: "https://img.freepik.com/premium-vector/human-machine-interface_951778-33575.jpg?w=740",
    careers: ["Mechanical Engineer", "Automobile Engineer", "Civil Engineer", "Electrical Engineer", "Electronics Engineer", "Manufacturing Engineer", "Quality Control Engineer", "Project Engineer", "Maintenance Engineer", "Industrial Engineer", "Robotics Engineer", "Aerospace Engineer", "Mechatronics Engineer", "Instrumentation Engineer", "Production Manager", "Design Engineer", "Technical Writer", "CAD Technician", "HVAC Technician", "Welding Engineer", "Marine Engineer", "Sound Engineer", "Renewable Energy Engineer", "Pipeline Engineer", "Construction Manager", "Safety Engineer", "Geotechnical Engineer", "Control Systems Engineer", "Chemical Engineer", "Mining Engineer", "Production Technician", "Field Service Engineer", "Telecommunications Engineer", "Tool and Die Maker", "Fitter"]

  },
  {
    id: 9,
    category: "Outdoor & Interest-based",
    image: "https://img.freepik.com/premium-vector/poster-man-with-backpack-camera-with-music-notes-it_608297-39972.jpg?w=740",
    careers: ["Outdoor Educator", "Adventure Guide", "Sports Coach", "Fitness Trainer", "Athlete", "Vlogger", "Travel Blogger", "Wildlife Photographer", "Environmental Educator", "Event Organizer","Culinary Instructor", "Dance Instructor", "Sports Commentator", "Park Ranger", "Tour Guide", "Recreational Therapist", "Fitness Consultant", "Campsite Manager", "Surf Instructor", "Zoologist", "Marine Biologist", "Landscaper", "Gardener", "Sports Official", "Outdoor Adventure Planner", "Nature Conservationist", "Equestrian Trainer", "Adventure Sports Instructor", "Cultural Performer", "Fitness Influencer", "Ski Instructor", "Dance Choreographer"]

  },
  {
    id: 10,
    category: "Office & Desk-Based",
    image: "https://img.freepik.com/free-vector/tax-preparation-concept-illustration_114360-19336.jpg?t=st=1725526345~exp=1725529945~hmac=f5287f406ef1f24147535dfadb95aca6b79425d9dd9c45a305ace0e945804afb&w=740",
    careers: ["Office Manager", "Administrative Assistant", "Accountant", "Data Entry Operator", "Human Resources Officer", "Project Coordinator", "Financial Analyst", "Marketing Coordinator", "Content Writer", "Graphic Designer", "IT Support Specialist", "Executive Assistant", "Receptionist", "Legal Assistant", "Database Administrator", "Customer Support Executive", "Research Analyst", "Business Development Executive", "Social Media Manager", "Technical Writer", "E-commerce Specialist", "Corporate Trainer", "Payroll Specialist", "Quality Assurance Analyst", "Procurement Specialist", "Operations Manager", "Sales Coordinator", "Insurance Underwriter", "Investment Analyst", "Public Relations Officer", "Compliance Officer", "Tax Consultant", "Management Consultant", "Virtual Assistant"]

  },
  {
    id: 11,
    category: "Remote & Flexible",
    image: "https://img.freepik.com/free-vector/freelancer-concept-illustration_114360-7590.jpg?t=st=1725526420~exp=1725530020~hmac=352db8a705bf830fdb89985c178efc17a32c4cc7fe74d731022615cd733a95d8&w=740",
    careers: ["Freelance Writer", "Remote Software Developer", "Digital Marketing Specialist", "Online Tutor", "Social Media Manager", "Data Analyst", "Content Creator", "SEO Specialist", "Remote Project Manager", "Consultant", "Transcriptionist", "Customer Support Specialist", "E-commerce Manager", "Affiliate Marketer", "Online Sales Representative", "Remote Recruiter", "App Developer", "Video Editor", "Remote Researcher", "Virtual Event Coordinator", "Copywriter", "Remote Account Manager", "Remote Financial Advisor", "Online Community Manager", "Language Translator", "Remote IT Support Specialist", "Telehealth Provider", "Remote Sales Executive"]

  },
  {
    id: 12,
    category: "High Social Impact",
    image: "https://img.freepik.com/free-vector/hand-drawn-community-spirit-illustration_23-2150188732.jpg?t=st=1725526462~exp=1725530062~hmac=d696d9dab7b5915b704bbac3e8adff55abe7d3ebf58bf6c60c88ae0dc14e3292&w=740",
    careers: ["Social Worker", "Nonprofit Manager", "Public Health Official", "Community Organizer", "Human Rights Advocate", "Education Consultant", "Policy Analyst", "Public Relations Specialist", "NGO Program Coordinator", "Microfinance Officer", "Sustainability Consultant", "Disaster Relief Coordinator", "Counselor", "Researcher in Social Sciences", "Youth Development Specialist", "Advocacy Director", "Gender Equality Consultant", "Urban Planner", "Corporate Social Responsibility Manager", "Volunteer Coordinator", "Public Policy Advisor", "Healthcare Administrator", "Child Welfare Specialist", "Crisis Intervention Specialist", "Cultural Heritage Specialist", "Economic Development Officer", "Environmental Activist", "Community Development Officer", "Social Impact Analyst", "Social Entrepreneur"]

  },
  {
    id: 13,
    category: "Innovation & Future-Oriented",
    image: "https://img.freepik.com/free-vector/flat-hand-drawn-people-starting-business-project-with-light-bulb_23-2148848896.jpg?t=st=1725528685~exp=1725532285~hmac=8e97bd3ad8e16b6cba0ea0cc5adada2d996dd2dbea848f78ff2033488e0ba8bb&w=740",
    careers: ["Innovation Manager", "Futurist", "Research and Development Engineer", "Artificial Intelligence Specialist", "Digital Transformation Consultant", "Smart City Planner", "Cybersecurity Analyst", "Growth Hacker", "Robotics Engineer", "Machine Learning Engineer", "Design Thinking Consultant", "Tech Start-up Founder", "Creative Technologist", "E-commerce Innovator", "Bioinformatics Specialist", "3D Printing Specialist", "Fintech Specialist", "Cloud Solutions Architect", "Human-Computer Interaction Specialist", "IoT Solutions Architect", "Nanotechnology Researcher", "Space Technology Researcher", "Advanced Manufacturing Engineer", "Diversity and Inclusion Consultant"]

  },
  {
    id: 14,
    category: "Global Careers",
    image: "https://img.freepik.com/free-vector/booking-flight-tickets-online-flat-vector-concept_81522-1139.jpg?t=st=1725528759~exp=1725532359~hmac=653ff778c9e91b24312109741d5b17f175ff4805266b9a9858919483184d4784&w=740",
    careers: ["International Business Consultant", "Global Marketing Manager", "Diplomat", "International Relations Specialist", "Foreign Service Officer", "Global Supply Chain Manager", "Cultural Attaché", "International Trade Specialist", "Humanitarian Aid Worker", "Global Compliance Officer", "Multinational Corporation Executive", "Expatriate Consultant", "Global HR Manager", "International Development Officer", "Foreign Language Teacher", "Migration Consultant", "Global Project Manager", "Cross-Cultural Trainer", "International Policy Analyst", "Global Financial Analyst", "Trade Policy Advisor", "International Law Attorney", "Environmental Policy Advocate", "Global Sales Executive",]

  },
  {
    id: 15,
    category: "Government Services",
    image: "https://img.freepik.com/free-vector/judge-concept-illustration_114360-1909.jpg?t=st=1725529015~exp=1725532615~hmac=51d708911b2c64527416af13f4729ca4ed0064250328fcbc19c1f0cb6974d725&w=740",
    careers: ["Indian Administrative Service (IAS)", "Indian Police Service (IPS)", "Indian Foreign Service (IFS)", "Civil Services Officer", "Public Health Officer", "Budget Analyst", "Urban Planner", "Tax Officer", "Legal Advisor", "Education Officer", "Social Welfare Officer", "Economic Development Officer", "Environmental Officer", "Labor Relations Specialist", "Government Relations Manager", "Community Development Officer", "Revenue Officer", "Public Relations Officer", "Transport Officer", "Disaster Management Officer", "Statistics Officer", "National Security Officer", "Census Officer", "Infrastructure Development Manager", "Agriculture Development Officer", "Public Policy Advisor", "Information Technology Officer", "Rural Development Officer", "Foreign Affairs Specialist", "Cultural Heritage Officer", "Assistant Town Planner", "Defense Services Officer", "Employment Officer"]

  }
];

export default careerData;
