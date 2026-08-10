"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { NexusSite } from "@/lib/sites";

export default function SiteCard({ site }: { site: NexusSite }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-sm border-2 bg-[#0c0c10] transition-transform duration-300 hover:-translate-y-1"
      style={{ borderColor: `${site.accent}55` }}
    >
      <div className="relative aspect-video overflow-hidden bg-[#111]">
        {site.screenshot ? (
          <Image
            src={site.screenshot}
            alt={`${site.title} screenshot`}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs uppercase tracking-widest">
            Screenshot coming soon
          </div>
        )}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(180deg, transparent 40%, ${site.accent}22 100%)` }}
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-black uppercase tracking-tight text-white">{site.title}</h3>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-gray-500 group-hover:text-white transition-colors"
          />
        </div>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{site.blurb}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {site.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase px-2 py-1 border rounded-full tracking-widest"
              style={{ borderColor: `${site.accent}66`, color: site.accent }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}
