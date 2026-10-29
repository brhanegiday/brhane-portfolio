import { Reveal } from "./reveal";

interface SectionHeadingProps {
    title: string;
    description: string;
}

/** The title and one-line description that open each section. */
export function SectionHeading({ title, description }: SectionHeadingProps) {
    return (
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
        </Reveal>
    );
}
