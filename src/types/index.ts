/* eslint-disable @typescript-eslint/no-explicit-any */
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
    | "AI/ML Application"
    | "Full-Stack Development"
    | "Team Leadership"
    | "Frontend Engineering";

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
    description?: string;
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

export type SkillCategory =
    | "Frontend"
    | "Backend"
    | "AI/ML"
    | "Database"
    | "Cloud/DevOps"
    | "Design"
    | "Tools"
    | "Core"
    | "Leadership";

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
    category: AchievementCategory;
    url?: string;
}

export type AchievementCategory =
    | "certification"
    | "content-creation"
    | "award"
    | "research"
    | "publication"
    | "speaking";

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

export interface AnimationVariant {
    initial: Record<string, any>;
    animate: Record<string, any>;
    transition: Record<string, any>;
}

export interface AnimationVariants {
    fadeIn: AnimationVariant;
    slideIn: AnimationVariant;
    stagger: {
        animate: {
            transition: {
                staggerChildren: number;
            };
        };
    };
    scaleIn: AnimationVariant;
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

// Statistics Types
export interface Stat {
    label: string;
    value: string;
}

// Featured Technology Type
export type FeaturedTechnology = string;

// Interest Type
export type Interest = string;

// Helper Function Return Types
export interface SkillsByCategory {
    [category: string]: Skill[];
}

export interface ProjectsByCategory {
    [category: string]: Project[];
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

export interface SkillFilters {
    category?: SkillCategory;
    proficiency?: Skill["proficiency"];
    minYearsOfExperience?: number;
}

export interface ExperienceFilters {
    type?: Experience["type"];
    location?: string;
    company?: string;
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

// Content Types for Blog/Articles (if needed in the future)
export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    readTime: string;
    tags: string[];
    slug: string;
    published?: boolean;
    featuredImage?: string;
    author?: string;
}

// Testimonial Type (if needed)
export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company?: string;
    content: string;
    avatar?: string;
    rating?: number;
    date?: string;
}

// Portfolio Configuration Types
export interface PortfolioConfig {
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    seoConfig: SEOConfig;
    navSections: NavSection[];
    featuredProjectIds: string[];
    featuredTechnologies: FeaturedTechnology[];
    interests: Interest[];
    stats: Stat[];
}

// Data Export Types
export interface PortfolioData {
    personalInfo: PersonalInfo;
    contactInfo: ContactInfo;
    experiences: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    achievements: Achievement[];
    config: PortfolioConfig;
}

// Component State Types
export interface ContactFormState {
    form: ContactForm;
    errors: ContactFormErrors;
    isSubmitting: boolean;
    isSuccess: boolean;
}

export interface ProjectModalState {
    isOpen: boolean;
    selectedProject: Project | null;
}

export interface FilterState<T> {
    filters: T;
    sortConfig?: SortConfig<any>;
    searchQuery?: string;
}

// Hook Return Types
export interface UseProjectsReturn {
    projects: Project[];
    filteredProjects: Project[];
    filters: ProjectFilters;
    setFilters: (filters: ProjectFilters) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortConfig: SortConfig<Project>;
    setSortConfig: (config: SortConfig<Project>) => void;
}

export interface UseSkillsReturn {
    skills: Skill[];
    skillsByCategory: SkillsByCategory;
    filters: SkillFilters;
    setFilters: (filters: SkillFilters) => void;
    expertSkills: Skill[];
}

// Animation Hook Types
export interface UseScrollAnimationReturn {
    ref: React.RefObject<HTMLElement>;
    isVisible: boolean;
    hasAnimated: boolean;
}

export interface UseTypingEffectReturn {
    displayText: string;
    isComplete: boolean;
}

// Responsive Design Types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveConfig {
    [key: string]: {
        [breakpoint in Breakpoint]?: any;
    };
}

// Error Types
export interface FormValidationError {
    field: string;
    message: string;
    code?: string;
}

export interface ApiError {
    message: string;
    code: number;
    details?: any;
}

// Loading States
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    status: LoadingState;
}

// Search Types
export interface SearchResult<T> {
    item: T;
    score: number;
    matches: string[];
}

export interface SearchConfig {
    keys: string[];
    threshold?: number;
    includeScore?: boolean;
    includeMatches?: boolean;
}

// Performance Monitoring Types
export interface PerformanceMetrics {
    loadTime: number;
    renderTime: number;
    interactionTime: number;
    route: string;
    timestamp: number;
}

// Analytics Types
export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, any>;
    timestamp: number;
    userId?: string;
    sessionId?: string;
}
