import type { Metadata } from "next";
import { ResultsView } from "@/components/results/ResultsView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ runId: string }>;
}): Promise<Metadata> {
  const { runId } = await params;
  const image = `/api/share/${runId}?format=og`;
  const title = "I found the place that fits me";
  const description = "Take 60 seconds and find the place on Earth that actually fits you.";
  return {
    title: "Your results",
    description,
    openGraph: { title, description, images: [{ url: image, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ResultsPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return <ResultsView runId={runId} />;
}
