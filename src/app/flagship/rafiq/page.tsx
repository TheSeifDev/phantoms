import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/data/site";
import { routeMetadata } from "@/lib/seo";

const project = projects.find((item) => item.slug === "rafiq")!;
export const metadata = routeMetadata("Rafiq — Flagship", project.summary.en, "/flagship/rafiq");

export default function RafiqFlagshipPage() {
  return <ProjectDetail project={project} />;
}
