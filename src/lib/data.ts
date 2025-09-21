// src/lib/data.ts

import { PersonalInfo, ContactInfo, Experience, Education, Project, Skill, Achievement, SocialLink } from "@/types";

export const personalInfo: PersonalInfo = {
    name: "Brhane Giday",
    title: "Staff Software Engineer & AI Researcher",
    tagline: "Building the Future with AI & Code",
    bio: `Staff Software Engineer with 5+ years of experience building scalable systems and AI applications. 
        MS in Information Technology from Carnegie Mellon University Africa. Currently leading research on AI 
        applications in healthcare at the Upanzi Network, specializing in Large Language Models for biomarker 
        assay variability harmonization. Passionate about creating impactful solutions at the intersection of 
        AI, healthcare, and modern software architecture.`,
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
        title: "Staff Software Engineer & AI Researcher",
        company: "Upanzi Network - Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2025-01",
        description:
            "Leading research and development of AI-driven healthcare solutions, specializing in Large Language Models for biomarker assay variability harmonization. Architecting scalable systems that bridge AI research and practical medical applications.",
        achievements: [
            "Architected LLM-powered systems for biomarker analysis serving 1000+ healthcare researchers",
            "Led cross-functional team of 8 engineers and researchers across 3 countries",
            "Reduced biomarker assay variability by 40% through AI-driven harmonization techniques",
            "Published 2 peer-reviewed papers on AI applications in healthcare technology",
        ],
        technologies: ["Python", "LLMs", "Healthcare APIs", "Microservices", "Docker", "AWS", "Research Methodologies"],
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
            "Led frontend engineering teams, architected scalable web applications, and established engineering best practices across multiple high-impact projects. Focused on building secure, performant applications for cybersecurity solutions.",
        achievements: [
            "Architected and led development of security dashboard serving 15K+ enterprise users",
            "Built comprehensive design system reducing development time by 50% across 5 product teams",
            "Mentored 12 junior developers and conducted 200+ code reviews",
            "Optimized application performance achieving 70% faster load times and 99.9% uptime",
            "Implemented security best practices reducing vulnerabilities by 85%",
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
        title: "Enterprise Student Management Platform",
        description:
            "Architected and led development of a comprehensive student management system serving 500+ students and 50+ faculty members with 99.9% uptime.",
        longDescription:
            "Led a 4-person engineering team to build a scalable student management platform from the ground up. The system handles complex workflows including enrollment, grading, scheduling, and communication with advanced role-based access control. Implemented real-time notifications and analytics that improved administrative efficiency by 60%.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Material-UI", "Socket.io", "JWT", "Docker"],
        category: "Enterprise Software Leadership",
        liveUrl: "https://sms-frontend-sw3p.onrender.com/",
        features: [
            "Multi-tenant Architecture",
            "Real-time Collaboration",
            "Advanced Analytics Dashboard",
            "Automated Enrollment Workflows",
            "Performance Monitoring",
            "Mobile-responsive Design",
        ],
        status: "completed",
        startDate: "2024-03",
        endDate: "2024-06",
        highlights: [
            "Reduced administrative workload by 60% through automation",
            "Achieved 99.9% uptime with zero data loss incidents",
            "Led cross-functional team of 4 engineers",
            "Implemented CI/CD pipeline reducing deployment time by 80%",
        ],
    },
    {
        id: "2",
        title: "Curricula.tech - AI Academic Planning Platform",
        description:
            "🎯 Problem: Students spend 15+ hours manually planning course sequences, often missing optimal paths. ⚡ Solution: Built AI-powered platform using LLMs for intelligent course recommendations. 📈 Impact: 70% reduction in planning time across 10+ universities, serving 2,000+ students.",
        longDescription:
            "**The Challenge:** Academic advisors were overwhelmed with course planning requests, while students struggled with complex prerequisite chains and optimal sequencing decisions, leading to delayed graduations and suboptimal academic paths.\n\n**My Approach:** Architected a comprehensive AI platform leveraging Large Language Models to analyze academic patterns, university requirements, and student profiles. Built scalable microservices architecture integrating with multiple university systems to provide real-time, personalized course recommendations.\n\n**Technical Leadership:** Led cross-functional team of 4 engineers, defining technical strategy and implementation roadmap. Designed fault-tolerant systems with 99.8% uptime and sub-200ms response times.\n\n**Measurable Impact:** Transformed academic planning for thousands of students, achieving 85% recommendation accuracy and reducing average planning time from 15 hours to 4.5 hours per semester.",
        technologies: [
            "Next.js",
            "Python",
            "OpenAI API",
            "PostgreSQL",
            "FastAPI",
            "TailwindCSS",
            "Prisma",
            "Docker",
            "AWS",
        ],
        category: "AI Platform Architecture",
        liveUrl: "https://www.curricula.tech/",
        features: [
            "Intelligent Course Sequencing Engine",
            "Multi-University Data Integration",
            "Predictive Academic Analytics",
            "Real-time Prerequisite Validation",
            "Personalized Learning Path Generation",
            "Scalable Microservices Architecture",
        ],
        status: "completed",
        startDate: "2024-01",
        endDate: "2024-08",
        highlights: [
            "85% accuracy in AI-driven course recommendations",
            "Integrated 10+ university database systems seamlessly",
            "70% reduction in student course planning time",
            "2,000+ active users across multiple institutions",
            "Led technical architecture and team of 4 engineers",
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
        title: "Africa Policy Intelligence Platform",
        description:
            "🎯 Problem: Legal professionals spending days researching scattered African regulatory documents. ⚡ Solution: Built AI-powered RAG system processing 1,000+ policy documents across 20+ countries. 📈 Impact: Reduced research time from days to minutes for 100+ legal professionals.",
        longDescription:
            "**The Challenge:** Legal and compliance professionals across Africa faced fragmented access to regulatory information, spending 3-5 days researching policy landscapes across multiple countries. Critical compliance decisions were delayed due to information silos.\n\n**My Solution:** Architected a sophisticated AI-powered regulatory analysis platform using advanced RAG (Retrieval-Augmented Generation) architecture. Built custom NLP pipelines to process and analyze complex legal documents, creating a unified knowledge base spanning 20+ African countries.\n\n**Technical Innovation:** Designed scalable vector search infrastructure capable of processing multilingual legal text with 90% accuracy. Implemented intelligent document parsing and semantic search capabilities that understand legal context and cross-jurisdictional relationships.\n\n**Business Impact:** Democratized access to regulatory intelligence, enabling legal professionals to make informed decisions 10x faster. Platform adoption grew to 100+ professionals within 4 months of launch.",
        technologies: [
            "Python",
            "Streamlit",
            "LangChain",
            "Vector DB",
            "FastAPI",
            "Transformers",
            "PostgreSQL",
            "Docker",
        ],
        category: "AI-Powered RegTech",
        features: [
            "Multi-jurisdictional Policy Mapping",
            "Advanced RAG Architecture",
            "Intelligent Compliance Analysis",
            "Comparative Regulatory Intelligence",
            "Semantic Legal Search",
            "Executive Reporting Dashboard",
        ],
        status: "completed",
        startDate: "2024-06",
        endDate: "2024-10",
        highlights: [
            "1,000+ policy documents processed across 20+ countries",
            "90% accuracy in complex legal query responses",
            "100+ legal professionals actively using platform",
            "Research time reduced from days to minutes",
            "Scalable vector search serving 10K+ queries/month",
        ],
    },
    {
        id: "5",
        title: "Ethiopian Airlines AI Support Platform",
        description:
            "🎯 Problem: 60% of customer queries resulted in long wait times and inconsistent support quality. ⚡ Solution: Architected enterprise AI support system with advanced RAG capabilities. 📈 Impact: 85% autonomous resolution rate, 60% reduction in wait times, handling 1,000+ daily queries.",
        longDescription:
            "**The Challenge:** Ethiopian Airlines faced mounting pressure from increasing customer service demands, with traditional support systems creating bottlenecks. Customers experienced average wait times of 45+ minutes, while support agents struggled with inconsistent information access across multiple systems.\n\n**My Approach:** Designed and implemented a comprehensive AI-powered customer support platform using advanced RAG architecture. Built seamless integrations with existing booking systems, customer databases, and knowledge management platforms to create a unified support experience.\n\n**Technical Excellence:** Architected multi-language processing capabilities supporting English and Amharic with 95% accuracy. Implemented intelligent query routing, sentiment analysis, and seamless human handoff protocols for complex scenarios requiring human intervention.\n\n**Transformational Impact:** Revolutionized customer experience with 85% of queries resolved autonomously, dramatically reducing wait times and improving customer satisfaction scores by 40%. Platform now serves as the primary customer interaction channel.",
        technologies: ["Python", "LangChain", "OpenAI API", "Vector DB", "FastAPI", "React", "MongoDB", "Redis"],
        category: "Enterprise AI Solutions",
        features: [
            "Multilingual RAG Processing Engine",
            "Legacy System Integration",
            "Intelligent Query Classification",
            "Real-time Sentiment Analysis",
            "Seamless Human Handoff Protocol",
            "Executive Analytics Dashboard",
        ],
        status: "completed",
        startDate: "2024-04",
        endDate: "2024-09",
        highlights: [
            "1,000+ customer queries processed daily",
            "85% autonomous resolution rate achieved",
            "60% reduction in average customer wait time",
            "95% accuracy in English and Amharic processing",
            "Seamless integration with 5+ legacy systems",
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
    { name: "TypeScript", category: "Frontend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Material-UI", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "GraphQL", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },

    // Backend
    { name: "Node.js", category: "Backend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "Express.js", category: "Backend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "Python", category: "Backend", proficiency: "expert", yearsOfExperience: 3 },
    { name: "Django", category: "Backend", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "FastAPI", category: "Backend", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "Microservices", category: "Backend", proficiency: "advanced", yearsOfExperience: 3 },

    // AI/ML
    { name: "Large Language Models", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "RAG Architecture", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "OpenAI API", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "LangChain", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "Vector Databases", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "Healthcare AI", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 1 },

    // Database
    { name: "PostgreSQL", category: "Database", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "MongoDB", category: "Database", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Redis", category: "Database", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "Prisma", category: "Database", proficiency: "advanced", yearsOfExperience: 2 },

    // Cloud/DevOps
    { name: "AWS", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Docker", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Kubernetes", category: "Cloud/DevOps", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "CI/CD Pipelines", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Vercel", category: "Cloud/DevOps", proficiency: "expert", yearsOfExperience: 3 },
    { name: "System Architecture", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 4 },

    // Leadership & Tools
    { name: "Technical Leadership", category: "Leadership", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Cross-functional Teams", category: "Leadership", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Mentoring", category: "Leadership", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "Strategic Planning", category: "Leadership", proficiency: "intermediate", yearsOfExperience: 2 },

    // Tools
    { name: "Git/GitHub", category: "Tools", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Jira", category: "Tools", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Figma", category: "Tools", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "VS Code", category: "Tools", proficiency: "expert", yearsOfExperience: 5 },
];

export const achievements: Achievement[] = [
    {
        id: "1",
        title: "AWS Certified Solutions Architect",
        description: "Advanced cloud architecture design and implementation expertise",
        date: "2024-03",
        category: "certification",
    },
    {
        id: "2",
        title: "Technical Leadership Excellence Award",
        description: "Recognition for leading high-performance engineering teams and delivering scalable solutions",
        date: "2024-09",
        category: "award",
    },
    {
        id: "3",
        title: "CMU Research Excellence Award",
        description: "Outstanding research in AI applications for healthcare and team leadership",
        date: "2024-12",
        category: "award",
    },
    {
        id: "4",
        title: "Published Research: LLM Healthcare Applications",
        description:
            "Lead author on research paper: 'Leveraging Large Language Models for Biomarker Assay Variability Harmonization'",
        date: "2024-11",
        category: "publication",
        url: "https://example.com/research-paper",
    },
    {
        id: "5",
        title: "Keynote: AI in Healthcare Conference",
        description:
            "Delivered keynote presentation on 'Scaling AI Solutions in Healthcare: From Research to Production'",
        date: "2024-10",
        category: "speaking",
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
    title: "Brhane Giday - Staff Software Engineer & AI Researcher",
    description:
        "Staff Software Engineer with 5+ years building scalable systems and AI applications. Leading AI research in healthcare at CMU. Expert in modern software architecture, AI/ML, and cross-functional team leadership.",
    keywords: [
        "Staff Software Engineer",
        "AI Researcher",
        "Healthcare Technology",
        "Large Language Models",
        "Software Architecture",
        "Team Leadership",
        "React",
        "Python",
        "Machine Learning",
        "Carnegie Mellon University",
        "Biomarker Analysis",
        "Scalable Systems",
        "Kigali Rwanda",
    ],
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@brhane_giday",
    canonicalUrl: "https://brhane-giday.vercel.app",
};

// Statistics for hero section
export const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "20+" },
    { label: "AI Solutions Built", value: "8+" },
    { label: "Teams Led", value: "3+" },
];

// Featured technologies for hero animation
export const featuredTechnologies = [
    "AI/ML",
    "System Architecture",
    "Team Leadership",
    "Python",
    "Next.js",
    "Healthcare Tech",
];

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
export const featuredProjectIds = ["2", "4", "5", "1"];

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
