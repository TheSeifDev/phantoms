import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/data/site";
import { routeMetadata } from "@/lib/seo";

const project = projects.find((item) => item.slug === "omni")!;
export const metadata = routeMetadata("OMNI — Flagship", project.summary.en, "/flagship/omni");

export default function OmniFlagshipPage() {
  return <ProjectDetail project={project} />;
}
