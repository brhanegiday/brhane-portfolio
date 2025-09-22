import { ScrollToTop } from "@/components/common/scroll-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";

export default function HomePage() {
    return (
        <div className="relative">
            <Navbar />

            <main>
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <ProjectsSection />
                <ContactSection />
            </main>

            <Footer />
            <ScrollToTop />
        </div>
    );
}
