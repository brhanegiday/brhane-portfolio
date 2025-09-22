import { Achievement, ContactInfo, Education, Experience, PersonalInfo, Project, Skill } from "@/types";

export const personalInfo: PersonalInfo = {
    name: "Brhane Giday",
    title: "Software Engineer & AI Researcher",
    tagline: "Building AI-Powered Solutions for Real-World Impact",
    bio: `Software engineer with 5+ years of experience in fullstack development, DevOps, and cloud-native solutions. 
        MSc in Information Technology from Carnegie Mellon University Africa. Currently conducting research on 
        Large Language Models at the Upanzi Network, specializing in LLM-powered policy and healthcare data analysis. 
        Passionate about architecting scalable applications, building CI/CD pipelines, and applying AI to solve 
        complex problems in healthcare and policy domains.`,
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
        // {
        //     platform: "YouTube",
        //     url: "https://youtube.com/@bashandbeyond",
        //     username: "Bash & Beyond",
        //     icon: "youtube",
        // },
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
        company: "Upanzi Network, Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2025-01",
        description:
            "Conducting cutting-edge research on LLM-powered policy and healthcare data analysis. Designing AI pipelines to process heterogeneous datasets across Africa and collaborating with policy experts, researchers, and engineers to create practical AI tools.",
        achievements: [
            "Designed AI pipelines for processing heterogeneous datasets across African countries",
            "Collaborated with cross-functional teams of policy experts, researchers, and engineers",
            "Developed LLM-powered analysis tools for healthcare and policy applications",
            "Created scalable solutions for data harmonization and policy analysis",
        ],
        technologies: ["Python", "LLMs", "OpenAI APIs", "Data Processing", "Healthcare Analytics", "Policy Analysis"],
        type: "research",
    },
    {
        id: "2",
        title: "Frontend Engineer",
        company: "Better Mobile Security",
        location: "Remote, USA",
        startDate: "2022-09",
        endDate: "2024-08",
        description:
            "Led frontend development teams for large-scale security applications using modern web technologies. Developed secure dashboards, optimized performance for thousands of users, and mentored junior engineers while integrating CI/CD workflows.",
        achievements: [
            "Led frontend team for large-scale security applications serving thousands of users",
            "Developed secure dashboards with advanced security features and user management",
            "Optimized application performance achieving significant load time improvements",
            "Integrated comprehensive CI/CD workflows and established development best practices",
            "Mentored junior engineers and conducted extensive code reviews",
            "Built scalable React applications with TypeScript and Next.js",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Security Dashboards", "CI/CD", "Performance Optimization"],
        type: "full-time",
    },
    {
        id: "3",
        title: "Frontend Engineer",
        company: "DoubleDice",
        location: "Remote, Belgium",
        startDate: "2022-03",
        endDate: "2022-09",
        description:
            "Built Web3-enabled interfaces with advanced wallet integrations and blockchain connectivity. Focused on improving scalability and optimizing user experience for decentralized applications.",
        achievements: [
            "Built Web3-enabled interfaces with Next.js and Redux architecture",
            "Implemented secure wallet integrations for cryptocurrency transactions",
            "Improved application scalability and performance optimization",
            "Enhanced user experience for decentralized application interactions",
            "Developed responsive interfaces with modern design patterns",
        ],
        technologies: ["Next.js", "Redux", "Web3.js", "Wallet Integration", "Blockchain", "DeFi"],
        type: "contract",
    },
    {
        id: "4",
        title: "Frontend Developer & UI/UX Designer",
        company: "MAD Technologies",
        location: "Ethiopia",
        startDate: "2020-09",
        endDate: "2021-10",
        description:
            "Delivered client websites combining WordPress with custom React components. Designed intuitive user interfaces using Figma and Adobe XD, focusing on user experience and modern design principles.",
        achievements: [
            "Delivered multiple client websites using WordPress with custom React components",
            "Designed intuitive user interfaces in Figma and Adobe XD",
            "Implemented responsive designs with modern UI/UX principles",
            "Collaborated with clients to understand requirements and deliver solutions",
            "Built custom React components for WordPress integration",
        ],
        technologies: ["WordPress", "React", "Figma", "Adobe XD", "UI/UX Design", "Custom Components"],
        type: "full-time",
    },
    {
        id: "5",
        title: "Team Lead & Frontend Engineer",
        company: "North Computing Group",
        location: "Ethiopia",
        startDate: "2019-11",
        endDate: "2020-08",
        description:
            "Led a small engineering team to deliver enterprise web solutions. Focused on building scalable, responsive, and user-friendly applications while managing team coordination and project delivery.",
        achievements: [
            "Led small engineering team for enterprise web solution delivery",
            "Focused on scalability, responsiveness, and usability in UI development",
            "Managed project timelines and team coordination effectively",
            "Delivered enterprise-grade web applications for business clients",
            "Established development workflows and quality standards",
        ],
        technologies: ["JavaScript", "React", "Team Leadership", "Enterprise Solutions", "Project Management"],
        type: "full-time",
    },
];

export const education: Education[] = [
    {
        id: "1",
        degree: "Master of Science",
        field: "Information Technology",
        institution: "Carnegie Mellon University Africa",
        location: "Kigali, Rwanda",
        startDate: "2023-08",
        endDate: "2025-05",
        relevantCoursework: [
            "Software Engineering",
            "DevOps and Cloud-Native Development",
            "Artificial Intelligence Applications",
            "Software Design and Architecture",
            "Scalable Systems Design",
            "Distributed Systems",
            "Applied Machine Learning",
        ],
        description:
            "Focused on software engineering, DevOps, and AI with emphasis on software design, architecture, and scalable systems. Coursework and projects explored distributed systems, cloud-native development, and applied machine learning.",
    },
    {
        id: "2",
        degree: "Bachelor of Science",
        field: "Electrical and Computer Engineering",
        institution: "Addis Ababa University",
        location: "Addis Ababa, Ethiopia",
        startDate: "2014-09",
        endDate: "2019-07",
        relevantCoursework: [
            "Computer Programming",
            "Computer Architecture",
            "Digital Logic Design",
            "Compilers",
            "Data Structures and Algorithms",
            "Software Engineering Principles",
        ],
        description:
            "Specialized in Computer Engineering with strong foundation in computer programming, computer architecture, and digital systems. The program provided both low-level systems knowledge and practical software development skills.",
    },
];

export const projects: Project[] = [
    {
        id: "1",
        title: "Curricula - AI-Powered Academic Advisor",
        description:
            "AI-powered platform helping students plan academic paths aligned with career goals using LLM-based recommendation engine.",
        longDescription:
            "**The Challenge:** Students spend countless hours trying to navigate complex university catalogs and prerequisite chains, often making suboptimal course selections that delay graduation or don't align with career goals.\n\n**My Solution:** Architected a comprehensive AI platform leveraging Large Language Models to parse university catalogs and provide personalized academic recommendations. Built both frontend and backend systems with CI/CD pipelines for seamless deployment.\n\n**Technical Innovation:** Designed recommendation engine using advanced NLP techniques to understand course relationships and career alignment. Implemented scalable architecture with Next.js frontend, Node.js backend, and MongoDB for data persistence.\n\n**Recognition:** Platform was successfully incubated at CMU-Africa's Industry Innovation Lab, demonstrating its potential for real-world impact in educational technology.",
        technologies: ["Next.js", "Node.js", "MongoDB", "OpenAI API", "LLMs", "CI/CD", "Academic Analytics"],
        category: "AI/ML Application",
        features: [
            "AI-Powered Course Recommendations",
            "University Catalog Parsing",
            "Academic Path Planning",
            "Career Goal Alignment",
            "Student and Faculty Workflows",
            "Scalable Microservices Architecture",
        ],
        status: "completed",
        startDate: "Jan 2024",
        endDate: "Jun 2024",
        highlights: [
            "Successfully incubated at CMU-Africa's Industry Innovation Lab",
            "AI-driven recommendations using Large Language Models",
            "Full-stack development with modern web technologies",
            "Comprehensive CI/CD pipeline implementation",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "2",
        title: "AI-Powered Policy Analyzer for Africa",
        description:
            "AI chatbot with LLM integration making complex African policies accessible through interactive Q&A and analysis.",
        longDescription:
            "**The Challenge:** African policy documents are often complex, fragmented, and difficult for citizens, researchers, and policymakers to navigate effectively, creating barriers to informed decision-making.\n\n**My Solution:** Developed a sophisticated AI-powered platform with a sleek, professional UI that makes complex policies accessible to all stakeholders. Integrated advanced LLM chatbot for interactive policy Q&A sessions.\n\n**Technical Excellence:** Built responsive design with smooth API integration, ensuring optimal user experience across devices. Implemented advanced natural language processing for accurate policy interpretation and contextual responses.",
        technologies: [
            "React",
            "Next.js",
            "LLMs",
            "OpenAI API",
            "Policy Analysis",
            "Conversational AI",
            "Responsive Design",
        ],
        category: "AI/ML Application",
        features: [
            "Interactive Policy Q&A Chatbot",
            "Professional UI for Complex Data",
            "LLM Integration for Policy Analysis",
            "Responsive Design",
            "API Integration",
            "Multi-stakeholder Access",
        ],
        status: "completed",
        startDate: "Mar 2024",
        endDate: "May 2024",
        highlights: [
            "Sleek, professional UI making complex policies accessible",
            "AI chatbot powered by Large Language Models",
            "Responsive design ensuring cross-device compatibility",
            "Smooth API integration for seamless user experience",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "3",
        title: "LLM-Based Healthcare Data Harmonization",
        description:
            "AI system using LLMs to harmonize fragmented healthcare datasets across Africa for better research and policy making.",
        longDescription:
            "**The Challenge:** Healthcare datasets across Africa are fragmented with inconsistent terminology, formats, and missing data, making it difficult for researchers and policymakers to conduct comprehensive analysis.\n\n**My Solution:** Built a comprehensive system using Large Language Models to automatically harmonize healthcare datasets, unifying terminology and formats while handling missing data intelligently.\n\n**Technical Innovation:** Developed robust pipelines for data processing, terminology mapping, and quality assurance. Created both frontend visualization tools and backend APIs for scalable data access.",
        technologies: [
            "Python",
            "LLMs",
            "Healthcare APIs",
            "Data Processing",
            "FastAPI",
            "Data Visualization",
            "ETL Pipelines",
        ],
        category: "AI/ML Application",
        features: [
            "Automated Data Harmonization",
            "Terminology Unification",
            "Missing Data Handling",
            "Frontend Visualization Tools",
            "Scalable Backend APIs",
            "Healthcare Data Standards",
        ],
        status: "completed",
        startDate: "Feb 2024",
        endDate: "Apr 2024",
        highlights: [
            "LLM-powered healthcare data harmonization system",
            "Unified terminology and format standardization",
            "Frontend tools for easy data visualization",
            "Scalable backend APIs for data access",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "4",
        title: "StayHub - Property Booking Platform",
        description:
            "Full-featured property booking platform with advanced booking management, secure payments, and comprehensive property listings similar to Airbnb.",
        longDescription:
            "Architected and developed a comprehensive end-to-end property rental platform with modern web technologies. Implemented advanced booking system, secure payment processing, and intuitive user interface for both property owners and renters.",
        technologies: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "CI/CD", "Docker", "Payment Integration"],
        category: "Full-Stack Development",
        features: [
            "Property Listing Management",
            "Advanced Booking System",
            "Secure Payment Processing",
            "User Authentication",
            "Responsive Design",
            "Admin Dashboard",
        ],
        status: "completed",
        startDate: "Jun 2023",
        endDate: "Oct 2023",
        highlights: [
            "End-to-end platform development",
            "Docker containerization and deployment",
            "Comprehensive CI/CD pipeline",
            "Modern web technologies integration",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "5",
        title: "Customer Support AI Chatbot for Ethiopian Airlines",
        description:
            "AI chatbot with RAG pipelines providing real-time customer support using airline-specific knowledge.",
        longDescription:
            "**The Challenge:** Ethiopian Airlines faced increasing customer service demands with traditional support creating bottlenecks and long wait times for customers.\n\n**My Solution:** Developed an intelligent AI chatbot using RAG (Retrieval-Augmented Generation) pipelines to provide instant, accurate responses to customer queries using airline-specific datasets including fares, schedules, and policies.\n\n**Technical Excellence:** Built scalable web application with Next.js frontend and Node.js backend, implementing secure APIs for data access and chat functionality.",
        technologies: [
            "Next.js",
            "Node.js",
            "RAG Pipelines",
            "LLMs",
            "Airline APIs",
            "Customer Support",
            "Real-time Chat",
        ],
        category: "AI/ML Application",
        features: [
            "Real-time Customer Support",
            "RAG Pipeline Integration",
            "Airline-specific Knowledge Base",
            "Secure API Implementation",
            "Scalable Web Application",
            "Multi-language Support",
        ],
        status: "completed",
        startDate: "Jan 2024",
        endDate: "Mar 2024",
        highlights: [
            "RAG pipelines for accurate, context-aware responses",
            "Integration with airline-specific datasets",
            "Scalable web application architecture",
            "Real-time customer query processing",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "6",
        title: "Role-Based Event Management System",
        description:
            "Comprehensive event management platform with multi-role user management, event creation, booking workflows, and administrative features.",
        longDescription:
            "Built a full-featured event management system supporting multiple user roles including admins, event coordinators, and participants. Implemented comprehensive event creation, booking management, and real-time features.",
        technologies: [
            "React",
            "Material-UI",
            "Tailwind CSS",
            "Role-Based Access",
            "Event Management",
            "Responsive Design",
        ],
        category: "Full-Stack Development",
        features: [
            "Multi-role User Management",
            "Event Creation and Management",
            "Booking System",
            "Real-time Updates",
            "Administrative Dashboard",
            "Responsive Interface",
        ],
        status: "completed",
        startDate: "Aug 2023",
        endDate: "Dec 2023",
        highlights: [
            "Role-based access control implementation",
            "Reusable React components with Material-UI",
            "Smooth API integrations",
            "Responsive design for all device types",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "7",
        title: "Open Data Portal",
        description:
            "Platform for researchers to upload, manage, and share datasets with advanced search capabilities, data validation, and collaboration features.",
        longDescription:
            "Designed and built a comprehensive data sharing platform enabling researchers and organizations to publish, discover, and collaborate on datasets. Features include advanced search, metadata management, and data visualization tools.",
        technologies: ["React", "Next.js", "TypeScript", "Data Management", "Search", "Accessibility"],
        category: "Frontend Engineering",
        features: [
            "Dataset Upload and Management",
            "Advanced Search Functionality",
            "Metadata Entry and Validation",
            "Data Preview Tools",
            "Collaboration Features",
            "Accessibility Compliance",
        ],
        status: "completed",
        startDate: "Apr 2023",
        endDate: "Jul 2023",
        highlights: [
            "Comprehensive data management platform",
            "Advanced search and filtering capabilities",
            "Dataset validation and preview tools",
            "Focus on accessibility and performance",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "8",
        title: "Salon Management System",
        description:
            "Complete salon management solution with booking system, staff management, and operational workflows for salon businesses.",
        longDescription:
            "Designed and implemented a comprehensive salon management system featuring intuitive UI/UX for booking management, staff coordination, and salon operations. Built with modern React and TypeScript architecture.",
        technologies: ["React", "TypeScript", "Booking System", "Staff Management", "API Integration"],
        category: "Frontend Engineering",
        features: [
            "Appointment Booking System",
            "Staff Management",
            "Service Management",
            "Customer Database",
            "Payment Integration",
            "Reporting Dashboard",
        ],
        status: "completed",
        startDate: "Jan 2023",
        endDate: "Mar 2023",
        highlights: [
            "Intuitive UI/UX design and implementation",
            "Comprehensive booking and scheduling system",
            "Staff management and coordination tools",
            "API integration for payments and scheduling",
        ],
        imageUrl: undefined,
        liveUrl: "#",
        githubUrl: "#",
    },
];

export const skills: Skill[] = [
    // Frontend
    { name: "React", category: "Frontend", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Next.js", category: "Frontend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "TypeScript", category: "Frontend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "JavaScript", category: "Frontend", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Material-UI", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Redux", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "GraphQL", category: "Frontend", proficiency: "advanced", yearsOfExperience: 3 },

    // Backend
    { name: "Node.js", category: "Backend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "Express.js", category: "Backend", proficiency: "expert", yearsOfExperience: 4 },
    { name: "Python", category: "Backend", proficiency: "expert", yearsOfExperience: 3 },
    { name: "FastAPI", category: "Backend", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "Java", category: "Backend", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "C++", category: "Backend", proficiency: "intermediate", yearsOfExperience: 2 },

    // AI/ML
    { name: "Large Language Models", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "RAG Pipelines", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "OpenAI APIs", category: "AI/ML", proficiency: "expert", yearsOfExperience: 2 },
    { name: "LLM Applications", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 2 },
    { name: "Healthcare AI", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 1 },
    { name: "Policy Analysis AI", category: "AI/ML", proficiency: "advanced", yearsOfExperience: 1 },

    // Database
    { name: "MongoDB", category: "Database", proficiency: "advanced", yearsOfExperience: 4 },
    { name: "PostgreSQL", category: "Database", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "MySQL", category: "Database", proficiency: "advanced", yearsOfExperience: 3 },

    // Cloud/DevOps
    { name: "AWS", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Docker", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Kubernetes", category: "Cloud/DevOps", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "Terraform", category: "Cloud/DevOps", proficiency: "intermediate", yearsOfExperience: 2 },
    { name: "GitHub Actions", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "CI/CD Pipelines", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "Linux", category: "Cloud/DevOps", proficiency: "advanced", yearsOfExperience: 4 },

    // Design & Tools
    // { name: "Figma", category: "Design", proficiency: "intermediate", yearsOfExperience: 3 },
    // { name: "Adobe XD", category: "Design", proficiency: "intermediate", yearsOfExperience: 2 },
    // { name: "WordPress", category: "Tools", proficiency: "advanced", yearsOfExperience: 3 },
    // { name: "Webflow", category: "Tools", proficiency: "intermediate", yearsOfExperience: 2 },

    // Leadership & Core
    { name: "Fullstack Engineering", category: "Core", proficiency: "expert", yearsOfExperience: 5 },
    { name: "Software Architecture", category: "Core", proficiency: "advanced", yearsOfExperience: 4 },
    // { name: "Technical Leadership", category: "Leadership", proficiency: "advanced", yearsOfExperience: 3 },
    { name: "DevOps Automation", category: "Core", proficiency: "advanced", yearsOfExperience: 3 },
    // { name: "Team Leadership", category: "Leadership", proficiency: "advanced", yearsOfExperience: 3 },
];

export const achievements: Achievement[] = [
    {
        id: "1",
        title: "AWS Certified Cloud Practitioner",
        description: "Certified in cloud computing fundamentals and AWS services",
        date: "2024",
        category: "certification",
    },
    {
        id: "2",
        title: "CompTIA Linux+ Certified",
        description: "Advanced Linux system administration and DevOps skills certification",
        date: "2024",
        category: "certification",
    },
    {
        id: "3",
        title: "Bash & Beyond YouTube Channel Founder",
        description: "Founded educational YouTube channel teaching Linux & DevOps through real-world scenarios",
        date: "2023",
        category: "content-creation",
    },
    {
        id: "4",
        title: "CMU-Africa Industry Innovation Lab Incubation",
        description: "Curricula platform successfully incubated at Carnegie Mellon University Africa's Innovation Lab",
        date: "2024",
        category: "award",
    },
    {
        id: "5",
        title: "Research Leadership in AI Healthcare Applications",
        description: "Leading research on LLM-powered healthcare data analysis at Upanzi Network",
        date: "2025",
        category: "research",
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
    title: "Brhane Giday - Software Engineer & Research Associate",
    description:
        "Software engineer with 5+ years of experience in fullstack development, DevOps, and cloud-native solutions. MS in Information Technology from Carnegie Mellon University Africa. Specializing in AI applications for healthcare and policy analysis.",
    keywords: [
        "Software Engineer",
        "Research Associate",
        "Fullstack Development",
        "Large Language Models",
        "Healthcare AI",
        "Policy Analysis",
        "React",
        "Next.js",
        "Python",
        "DevOps",
        "Carnegie Mellon University",
        "Upanzi Network",
        "Kigali Rwanda",
    ],
    ogImage: "/images/og-image.jpg",
    canonicalUrl: "https://brhane-giday.vercel.app",
};

// Statistics for hero section
export const stats = [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Delivered", value: "15+" },
    { label: "AI Solutions Built", value: "6+" },
    { label: "Teams Led", value: "4+" },
];

// Featured technologies for hero animation
export const featuredTechnologies = ["React", "Next.js", "Python", "AI/ML", "Node.js", "TypeScript", "AWS", "DevOps"];

// Interests and Focus Areas
export const interests = [
    "AI for Social Good",
    "Healthcare Technology",
    "Policy Analysis AI",
    "Educational Technology",
    "Developer Mentoring",
    "Open Source Contribution",
    "Linux & DevOps Education",
    "Technical Content Creation",
];

// Featured project IDs for homepage
export const featuredProjectIds = ["1", "2", "3", "5"];

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
        const startYear = parseInt(project.startDate.split(" ")[1]);
        return startYear >= 2023;
    })
    .sort((a, b) => {
        const yearA = parseInt(a.startDate.split(" ")[1]);
        const yearB = parseInt(b.startDate.split(" ")[1]);
        return yearB - yearA;
    });

// Helper functions
export const getProjectsByCategory = (category: string) => projects.filter((project) => project.category === category);

export const getSkillsByProficiency = (proficiency: string) =>
    skills.filter((skill) => skill.proficiency === proficiency);

export const getFeaturedProjects = () => projects.filter((project) => featuredProjectIds.includes(project.id));

export const getCurrentExperience = () => experiences.find((exp) => !exp.endDate);

export const getCompletedProjects = () => projects.filter((project) => project.status === "completed");

export const getExpertSkills = () => skills.filter((skill) => skill.proficiency === "expert");

export const getRecentAchievements = () => achievements.sort((a, b) => parseInt(b.date) - parseInt(a.date)).slice(0, 3);

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
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
    },
};
