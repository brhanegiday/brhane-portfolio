// src/types/index.ts

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    category: ProjectCategory;
    liveUrl?: string;
    githubUrl?: string;
    imageUrl?: string;
    features: string[];
    status: "completed" | "in-progress" | "planned";
    startDate: string;
    endDate?: string;
    highlights?: string[];
}

export type ProjectCategory =
    | "Enterprise Software Leadership"
    | "AI Platform Architecture"
    | "AI-Powered RegTech"
    | "Enterprise AI Solutions"
    | "Full-Stack Development"
    | "AI/ML Application"
    | "Data Platform"
    | "AI/Policy Analysis"
    | "AI Customer Support"
    | "Enterprise Software"
    | "E-commerce Platform"
    | "Healthcare Technology";

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements?: string[];
    technologies?: string[];
    type: "full-time" | "part-time" | "contract" | "internship" | "research";
}

export interface Education {
    id: string;
    degree: string;
    field: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    honors?: string[];
    relevantCoursework?: string[];
    thesis?: string;
}

export interface Skill {
    name: string;
    category: SkillCategory;
    proficiency: "beginner" | "intermediate" | "advanced" | "expert";
    yearsOfExperience?: number;
}

export type SkillCategory = "Frontend" | "Backend" | "AI/ML" | "Database" | "Cloud/DevOps" | "Leadership" | "Tools" | "Design";

export interface SocialLink {
    platform: string;
    url: string;
    username?: string;
    icon: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    socialLinks: SocialLink[];
}

export interface PersonalInfo {
    name: string;
    title: string;
    tagline: string;
    bio: string;
    profileImage?: string;
    resumeUrl?: string;
    cvUrl?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    category: "award" | "certification" | "publication" | "project" | "speaking" | "other";
    url?: string;
}

export interface Publication {
    id: string;
    title: string;
    authors: string[];
    journal?: string;
    conference?: string;
    date: string;
    url?: string;
    abstract?: string;
    type: "journal" | "conference" | "workshop" | "preprint";
}

// Component Props Types
export interface SectionProps {
    className?: string;
    children?: React.ReactNode;
}

export interface ProjectCardProps {
    project: Project;
    variant?: "default" | "featured" | "compact";
}

export interface ExperienceCardProps {
    experience: Experience;
    variant?: "default" | "timeline";
}

export interface SkillBadgeProps {
    skill: Skill;
    variant?: "default" | "detailed";
}

// Navigation Types
export interface NavItem {
    label: string;
    href: string;
    external?: boolean;
}

export interface NavSection {
    id: string;
    label: string;
    href: string;
}

// Animation Types
export interface AnimationConfig {
    duration?: number;
    delay?: number;
    ease?: string;
}

// Theme Types
export interface ThemeConfig {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    fonts: {
        heading: string;
        body: string;
        mono: string;
    };
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
    timestamp: string;
}

// Form Types
export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    { [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>> }[Keys];

// Filter and Sort Types
export interface ProjectFilters {
    category?: ProjectCategory;
    technology?: string;
    status?: Project["status"];
}

export interface SortConfig<T> {
    key: keyof T;
    direction: "asc" | "desc";
}

// SEO Types
export interface SEOConfig {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
    twitterHandle?: string;
    canonicalUrl?: string;
}
