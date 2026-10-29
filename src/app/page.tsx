import { ScrollToTop } from "@/components/common/scroll-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { TechMarquee } from "@/components/common/tech-marquee";

export default function HomePage() {
    return (
        <div className="relative">
            <ScrollProgress />
            <Navbar />

            <main>
                <HeroSection />
                <TechMarquee />
                <ShowcaseSection />
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
