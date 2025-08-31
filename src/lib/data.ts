// src/lib/data.ts

import { PersonalInfo, ContactInfo, Experience, Education, Project, Skill, Achievement, SocialLink } from "@/types";

export const personalInfo: PersonalInfo = {
    name: "Brhane Giday",
    title: "Software Engineer & AI Researcher",
    tagline: "Building the Future with AI & Code",
    bio: `I'm a Software Engineer with over 5 years of experience specializing in full-stack development 
        and AI applications. Recently graduated with an MS in Information Technology from Carnegie Mellon 
        University Africa, where I focused on Software Engineering and AI research. Currently working as a 
        Research Associate at the Upanzi Network, leading research on leveraging Large Language Models for 
        biomarker assay variability harmonization in healthcare technology.`,
    profileImage: "/images/brhane-giday.jpg",
    resumeUrl: "/documents/Brhane-Giday_Resume.pdf",
    cvUrl: "/documents/Brhane_Giday_CV.pdf",
};

export const contactInfo: ContactInfo = {
    email: "brhane5giday@gmail.com",
    phone: "+250793092181",
    location: "Kigali, Rwanda",
    socialLinks: [
        {
            platform: "GitHub",
            url: "https://github.com/brhanegiday",
            username: "brhanegiday",
            icon: "github",
        },
        {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/brhane-giday",
            username: "brhane-giday",
            icon: "linkedin",
        },
        {
            platform: "Twitter",
            url: "https://twitter.com/brhane_giday",
            username: "brhane_giday",
            icon: "twitter",
        },
        {
            platform: "Instagram",
            url: "https://instagram.com/brhane_giday",
            username: "brhane_giday",
            icon: "instagram",
        },
    ],
};

export const experiences: Experience[] = [
    {
        id: "1",
        title: "Research Associate",
        company: "Upanzi Network - Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2025-01",
        description:
            "Leading research on leveraging Large Language Models for biomarker assay variability harmonization in healthcare technology applications.",
        achievements: [
            "Developed AI-driven solutions for healthcare technology applications",
            "Collaborated with international clinical and technical experts",
            "Published research on LLM applications in biomarker analysis",
        ],
        technologies: ["Python", "LLMs", "Healthcare APIs", "Research Methodologies"],
        type: "research",
    },
    {
        id: "2",
        title: "Graduate Research Assistant",
        company: "Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2024-08",
        endDate: "2024-12",
        description:
            'Teaching Assistant for "Data Structures and Algorithms for Engineers" course, mentoring students in advanced computer science concepts.',
        achievements: [
            "Mentored 50+ students in advanced CS concepts",
            "Designed practical assignments and coding exercises",
            "Improved student performance by 25% through personalized guidance",
        ],
        technologies: ["Python", "Java", "Algorithm Design", "Educational Technology"],
        type: "part-time",
    },
    {
        id: "3",
        title: "Frontend Developer",
        company: "Better Mobile Security",
        location: "Remote, USA",
        startDate: "2022-09",
        endDate: "2024-08",
        description:
            "Led frontend development teams, architected complex web applications using modern technologies, and implemented best practices across multiple projects.",
        achievements: [
            "Led frontend development for security dashboard serving 10K+ users",
            "Implemented responsive design system reducing development time by 40%",
            "Conducted code reviews and mentored junior developers",
            "Optimized application performance resulting in 60% faster load times",
        ],
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
        type: "full-time",
    },
    {
        id: "4",
        title: "Senior Frontend Developer",
        company: "DoubleDice",
        location: "Remote",
        startDate: "2022-03",
        endDate: "2022-09",
        description:
            "Developed complex betting platform interface with real-time updates and advanced user interactions.",
        achievements: [
            "Built real-time betting interface with WebSocket integration",
            "Implemented advanced charting and analytics features",
            "Optimized mobile experience for better user engagement",
        ],
        technologies: ["React", "Web3.js", "Socket.io", "Material-UI", "Redux"],
        type: "contract",
    },
];

export const education: Education[] = [
    {
        id: "1",
        degree: "Master of Science",
        field: "Information Technology",
        institution: "Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2023-07",
        endDate: "2025-05",
        relevantCoursework: [
            "Foundations of Software Engineering",
            "Machine Learning",
            "Data Structures and Algorithms",
            "Software Architecture",
            "AI Applications in Healthcare",
        ],
        thesis: "Leveraging Large Language Models for Biomarker Assay Variability Harmonization",
    },
    {
        id: "2",
        degree: "Bachelor of Science",
        field: "Electrical and Computer Engineering",
        institution: "Addis Ababa University",
        location: "Addis Ababa, Ethiopia",
        startDate: "2014-09",
        endDate: "2019-08",
        honors: ["Dean's List"],
        relevantCoursework: [
            "Computer Programming",
            "Digital Systems Design",
            "Software Engineering",
            "Database Systems",
            "Network Programming",
        ],
    },
];

export const projects: Project[] = [
    {
        id: "1",
        title: "SMS Management System",
        description:
            "A comprehensive student management system with role-based access control, real-time notifications, and advanced analytics dashboard.",
        longDescription:
            "Built a full-stack student management system that handles enrollment, grading, scheduling, and communication. Features include role-based authentication, real-time notifications, analytics dashboard, and mobile-responsive design.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Material-UI", "Socket.io", "JWT"],
        category: "Full-Stack Development",
        liveUrl: "https://sms-frontend-sw3p.onrender.com/",
        features: [
            "Role-based Authentication",
            "Real-time Notifications",
            "Analytics Dashboard",
            "Student Enrollment System",
            "Grade Management",
            "Scheduling System",
        ],
        status: "completed",
        startDate: "2024-03",
        endDate: "2024-06",
        highlights: [
            "Serves 500+ students and 50+ faculty members",
            "99.9% uptime with robust error handling",
            "Mobile-first responsive design",
        ],
    },
    {
        id: "2",
        title: "Curricula.tech",
        description:
            "AI-powered academic course planning and recommendation platform using Large Language Models for personalized learning paths.",
        longDescription:
            "Developed an intelligent course planning system that uses LLMs to analyze student profiles and recommend optimal course sequences. Integrates with university databases and provides personalized learning analytics.",
        technologies: ["Next.js", "Python", "OpenAI API", "PostgreSQL", "FastAPI", "TailwindCSS", "Prisma"],
        category: "AI/ML Application",
        liveUrl: "https://www.curricula.tech/",
        features: [
            "LLM-powered Recommendations",
            "Personalized Learning Paths",
            "Course Prerequisites Analysis",
            "Academic Progress Tracking",
            "Integration with University Systems",
            "Real-time Chat Support",
        ],
        status: "completed",
        startDate: "2024-01",
        endDate: "2024-08",
        highlights: [
            "AI-driven course recommendations with 85% accuracy",
            "Integrated with 10+ university databases",
            "Reduced course planning time by 70%",
        ],
    },
    {
        id: "3",
        title: "Open Data Platform",
        description:
            "Public and private dataset sharing platform with advanced search capabilities, data visualization, and collaborative features.",
        longDescription:
            "Created a comprehensive data sharing platform that enables organizations and researchers to publish, discover, and collaborate on datasets. Features advanced search, data visualization, and API integration.",
        technologies: ["React", "Django", "PostgreSQL", "ElasticSearch", "D3.js", "AWS S3", "Redis"],
        category: "Data Platform",
        features: [
            "Advanced Dataset Search",
            "Data Visualization Tools",
            "API Integration",
            "Collaboration Features",
            "Version Control for Datasets",
            "Usage Analytics",
        ],
        status: "completed",
        startDate: "2023-09",
        endDate: "2024-02",
        highlights: [
            "Hosts 1000+ datasets from 50+ organizations",
            "Advanced search with ML-powered relevance",
            "RESTful API with 99.5% uptime",
        ],
    },
    {
        id: "4",
        title: "Africa Policy Analyzer",
        description:
            "AI chatbot system for analyzing data protection and digital regulations across African countries with natural language processing.",
        longDescription:
            "Built an intelligent policy analysis system that helps legal professionals and researchers understand and compare data protection regulations across African countries using advanced NLP and RAG architecture.",
        technologies: ["Python", "Streamlit", "LangChain", "Vector DB", "FastAPI", "Transformers", "PostgreSQL"],
        category: "AI/Policy Analysis",
        features: [
            "Multi-country Policy Analysis",
            "RAG-based Question Answering",
            "Regulatory Compliance Checks",
            "Policy Comparison Tools",
            "Natural Language Queries",
            "Export and Reporting",
        ],
        status: "completed",
        startDate: "2024-06",
        endDate: "2024-10",
        highlights: [
            "Covers 20+ African countries' policies",
            "NLP accuracy of 90% for policy queries",
            "Used by 100+ legal professionals",
        ],
    },
    {
        id: "5",
        title: "Ethiopian Airlines Support Bot",
        description:
            "Customer support AI chatbot system using Retrieval-Augmented Generation for handling customer queries and bookings.",
        longDescription:
            "Developed an intelligent customer support system for Ethiopian Airlines that handles booking inquiries, flight information, and general customer support using RAG architecture for accurate, context-aware responses.",
        technologies: ["Python", "LangChain", "OpenAI API", "Vector DB", "FastAPI", "React", "MongoDB"],
        category: "AI Customer Support",
        features: [
            "RAG-based Customer Support",
            "Flight Booking Integration",
            "Multi-language Support",
            "24/7 Availability",
            "Sentiment Analysis",
            "Escalation to Human Agents",
        ],
        status: "completed",
        startDate: "2024-04",
        endDate: "2024-09",
        highlights: [
            "Handles 1000+ queries daily",
            "85% query resolution without human intervention",
            "Supports English and Amharic languages",
        ],
    },
    {
        id: "6",
        title: "Event Management System",
        description:
            "Role-based event management platform with comprehensive user roles including admin, event coordinators, and participants.",
        longDescription:
            "Built a comprehensive event management system that handles event creation, registration, scheduling, and analytics with different user roles and permissions for seamless event organization.",
        technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "NextAuth.js", "Tailwind CSS", "Socket.io"],
        category: "Enterprise Software",
        features: [
            "Multi-role User Management",
            "Event Creation and Scheduling",
            "Registration Management",
            "Real-time Notifications",
            "Analytics Dashboard",
            "Payment Integration",
        ],
        status: "completed",
        startDate: "2023-11",
        endDate: "2024-03",
        highlights: [
            "Manages 100+ events annually",
            "Supports 5 different user roles",
            "Real-time collaboration features",
        ],
    },
    {
        id: "7",
        title: "Property Booking Platform",
        description:
            "Airbnb-like property booking system with date-based availability, secure payments, and comprehensive booking management.",
        longDescription:
            "Developed a full-featured property rental platform with advanced booking system, payment processing, property management, and review system similar to Airbnb with enhanced security features.",
        technologies: ["Next.js", "Stripe API", "PostgreSQL", "Prisma", "Tailwind CSS", "Cloudinary", "NextAuth.js"],
        category: "E-commerce Platform",
        features: [
            "Property Listing Management",
            "Advanced Booking System",
            "Secure Payment Processing",
            "Review and Rating System",
            "Calendar Integration",
            "Host Dashboard",
        ],
        status: "completed",
        startDate: "2023-06",
        endDate: "2023-10",
        highlights: [
            "Zero double-booking incidents",
            "Integrated with Stripe for secure payments",
            "Mobile-responsive design",
        ],
    },
];

export const skills: Skill[] = [
    // Frontend
    { name: "React", category: "Frontend", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Next.js", category: "Frontend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "TypeScript", category: "Frontend", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Material-UI", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "GraphQL", category: "Frontend", proficiency: "intermediate", yearsOfExperience: 2 },

    // Backend
    { name: "Node.js", category: "Backend", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "Express.js", category: "Backend", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "Python", category: "Backend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Django", category: "Backend", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "FastAPI", category: "Backend", proficiency: "intermediate", yearsOfExperience: 2 },

    // AI/ML
    { name: "Large Language Models", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "RAG (Retrieval-Augmented Generation)", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 1 },
    { name: "OpenAI API", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "LangChain", category: "AI/ML", proficiency: "intermediate", yearsOfExperience: 1 },
    { name: "Vector Databases", category: "AI/ML", proficiency: "intermediate", yearsOfExperience: 1 },

    // Database
    { name: "PostgreSQL", category: "Database", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "MongoDB", category: "Database", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Redis", category: "Database", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "Prisma", category: "Database", proficiency: "advanced", yearsOfExperience: 2 },

    // Cloud/DevOps
    { name: "AWS", category: "Cloud/DevOps", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "Docker", category: "Cloud/DevOps", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "Vercel", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Netlify", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },

    // Tools
    { name: "Git/GitHub", category: "Tools", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Jira", category: "Tools", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Figma", category: "Tools", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "VS Code", category: "Tools", proficiency: "expert", yearsOfExperience: 5 },
];

export const achievements: Achievement[] = [
    {
        id: "1",
        title: "AWS Certified Cloud Practitioner",
        description: "Fundamental understanding of AWS Cloud concepts, services, and terminology",
        date: "2024-03",
        category: "certification",
    },
    {
        id: "2",
        title: "Advanced React Certification",
        description: "Advanced concepts in React development and ecosystem",
        date: "2023-11",
        category: "certification",
    },
    {
        id: "3",
        title: "CMU Research Excellence Award",
        description: "Recognition for outstanding research in AI applications for healthcare",
        date: "2024-12",
        category: "award",
    },
    {
        id: "4",
        title: "Published Research on LLM Healthcare Applications",
        description: "Co-authored research paper on biomarker assay variability harmonization using LLMs",
        date: "2024-11",
        category: "publication",
        url: "https://example.com/research-paper",
    },
];

// Navigation configuration
export const navSections = [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "contact", label: "Contact", href: "#contact" },
];

// SEO configuration
export const seoConfig = {
    title: "Brhane Giday - Software Engineer & AI Researcher",
    description:
        "Software Engineer with 5+ years of experience specializing in full-stack development and AI applications. MS in Information Technology from Carnegie Mellon University.",
    keywords: [
        "Software Engineer",
        "AI Researcher",
        "Full Stack Developer",
        "React Developer",
        "Machine Learning",
        "Large Language Models",
        "Healthcare Technology",
        "Carnegie Mellon University",
        "Kigali Rwanda",
    ],
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@brhane_giday",
    canonicalUrl: "https://brhane-giday.vercel.app",
};

// Statistics for hero section
export const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "15+" },
    { label: "AI Solutions Built", value: "5+" },
    { label: "Technologies Mastered", value: "20+" },
];

// Featured technologies for hero animation
export const featuredTechnologies = ["React", "TypeScript", "Node.js", "Python", "AI/ML", "Next.js"];

// Testimonials (if available)
export const testimonials = [
    {
        id: "1",
        name: "Prof. David Vernon",
        title: "Professor at Carnegie Mellon University Africa",
        content:
            "Brhane demonstrated exceptional technical skills and leadership as a teaching assistant. His ability to explain complex algorithms and mentor students is outstanding.",
        avatar: "/images/testimonials/prof-vernon.jpg",
    },
    // Add more testimonials as needed
];

// Blog posts or articles (if you plan to add a blog)
export const blogPosts = [
    {
        id: "1",
        title: "Building Scalable AI Applications with RAG Architecture",
        excerpt: "Learn how to build robust AI applications using Retrieval-Augmented Generation patterns.",
        date: "2024-10-15",
        readTime: "8 min read",
        tags: ["AI/ML", "RAG", "Python"],
        slug: "building-scalable-ai-applications-rag",
    },
    {
        id: "2",
        title: "Modern Frontend Development with Next.js and TypeScript",
        excerpt: "Best practices for building type-safe, performant web applications.",
        date: "2024-09-20",
        readTime: "12 min read",
        tags: ["Next.js", "TypeScript", "Frontend"],
        slug: "modern-frontend-nextjs-typescript",
    },
];

// Featured project IDs for homepage
export const featuredProjectIds = ["1", "2", "4", "5"];

// Skills grouped by category for display
export const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
        acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
}, {} as Record<string, Skill[]>);

// Recent projects (last 2 years)
export const recentProjects = projects
    .filter((project) => {
        const startYear = new Date(project.startDate).getFullYear();
        return startYear >= 2023;
    })
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

// Helper functions
export const getProjectsByCategory = (category: string) => projects.filter((project) => project.category === category);

export const getSkillsByProficiency = (proficiency: string) =>
    skills.filter((skill) => skill.proficiency === proficiency);

export const getFeaturedProjects = () => projects.filter((project) => featuredProjectIds.includes(project.id));

export const getCurrentExperience = () => experiences.find((exp) => !exp.endDate);

export const getCompletedProjects = () => projects.filter((project) => project.status === "completed");

// Animation variants for Framer Motion
export const animationVariants = {
    fadeIn: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    },
    slideIn: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
    },
    stagger: {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};
