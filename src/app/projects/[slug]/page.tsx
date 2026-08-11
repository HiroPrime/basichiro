import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import GalleryGrid from "@/components/GalleryGrid";
import ProjectCaseStudyBody from "@/components/ProjectCaseStudyBody";
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
        className="pt-36 md:pt-44 pb-16 px-6 md:px-12 max-w-[1100px] mx-auto"
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

        <ProjectCaseStudyBody project={project} artworks={artworks} />
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
