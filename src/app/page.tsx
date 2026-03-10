import Image from "next/image";
import BentoGrid from "@/components/BentoGrid";
import DotGrid from "@/components/DotGrid";
import projects from "@/data/projects.json";
import { Project } from "@/types/project";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <DotGrid />
      {/* Header */}
      <header className="mb-12 sm:mb-16">
        <Image
          src="/images/qquest-logo-dark.png"
          alt="Qquest logo"
          width={160}
          height={48}
          className="mb-4"
          priority
        />
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Project Dashboard
        </h1>
        <p className="max-w-lg text-base leading-relaxed text-text-muted">
          A collection of applications, tools, and experiments.
        </p>
      </header>

      {/* Bento Grid */}
      <BentoGrid projects={projects as Project[]} />
    </main>
  );
}
