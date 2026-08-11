import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import GalleryGrid from "@/components/GalleryGrid";
import { getArtworksByCollection } from "@/lib/artworks";
import { PROJECT_CASE_STUDIES, getProjectCaseStudy } from "@/lib/projects";

export const revalidate = 300;

export async function generateStaticParams() {
  return PROJECT_CASE_STUDIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Projects | BasicHiro`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectCaseStudy(slug);
  if (!project) notFound();

  const artworks = await getArtworksByCollection(project.collectionSlug);

  return (
    <main className="min-h-screen bg-[#07070a] text-white font-sans">
      <Header />
      <section
        className="pt-36 md:pt-44 pb-16 px-6 md:px-12 max-w-[1000px] mx-auto"
        style={{ ["--collection-accent" as string]: project.accent }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        <p
          className="font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase"
          style={{ color: project.accent }}
        >
          {project.type}
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase ink-text text-white mb-4">
          {project.title}
        </h1>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mb-14">{project.tagline}</p>

        <div
          className="border-l-2 pl-6 md:pl-8 mb-16"
          style={{ borderColor: project.accent }}
        >
          <p className="text-gray-200 text-base md:text-xl font-medium leading-relaxed">
            {project.brief}
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-14 mb-16">
          {project.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4">
                {section.heading}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed italic border-t border-[#1a1a1e] pt-10">
          {project.closing}
        </p>
      </section>

      <section className="px-6 md:px-12 pb-24 max-w-[1600px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p
              className="font-black tracking-[0.4em] text-[10px] md:text-xs mb-3 uppercase"
              style={{ color: project.accent }}
            >
              Supporting Work
            </p>
            <h2 className="text-2xl md:text-4xl font-black tracking-tighter uppercase ink-text text-white">
              The Gallery
            </h2>
          </div>
          <Link
            href={`/gallery/${project.collectionSlug}`}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
          >
            See the full collection <ArrowUpRight size={14} />
          </Link>
        </div>

        {artworks.length > 0 ? (
          <GalleryGrid artworks={artworks} />
        ) : (
          <p className="text-gray-500 text-sm uppercase tracking-widest py-24 text-center border border-dashed border-[#222] rounded-sm">
            Nothing imported for this collection yet.
          </p>
        )}
      </section>
    </main>
  );
}
