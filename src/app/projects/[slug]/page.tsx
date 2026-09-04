import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getCmsProject, getCmsProjects } from "@/lib/cms/repository";

import { CmsProjectPage } from "../_components/cms-project-page";

interface CmsProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getCmsProjects();
  return projects?.map((project) => ({ slug: project.slug })) ?? [];
}

export async function generateMetadata({ params }: CmsProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCmsProject(slug);

  return {
    title: project?.title ?? "Project",
    description: project?.tagline ?? project?.description,
  };
}

export default async function ProjectPage({ params }: CmsProjectPageProps) {
  const { slug } = await params;
  const project = await getCmsProject(slug);
  if (!project) notFound();

  return <CmsProjectPage project={project} />;
}
