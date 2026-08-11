import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import { PROJECT_CASE_STUDIES } from "@/lib/projects";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Projects | BasicHiro",
  description:
    "Case studies behind four standout BasicHiro projects — the briefs, the design choices, and the why.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />
      <section className="pt-36 md:pt-44 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase text-center">
          Case Studies
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white text-center mb-4">
          Projects
        </h1>
        <p className="text-gray-400 text-sm md:text-base text-center max-w-2xl mx-auto mb-14">
          Four projects worth slowing down for — the brief behind each one, the design decisions
          that shaped it, and why it was built the way it was.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_CASE_STUDIES.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative flex flex-col justify-between overflow-hidden rounded-sm border-2 bg-[#0c0c10] p-8 min-h-[260px] transition-transform duration-300 hover:-translate-y-1"
              style={{ borderColor: `${project.accent}55` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 20% 0%, ${project.accent}22 0%, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <p
                  className="font-black tracking-[0.3em] text-[10px] uppercase mb-4"
                  style={{ color: project.accent }}
                >
                  {project.type}
                </p>
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{project.tagline}</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-8 text-xs font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                Read the case study
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
