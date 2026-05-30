import { ResultsView } from "@/components/results/ResultsView";

export const metadata = { title: "Your results" };

export default async function ResultsPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  return <ResultsView runId={runId} />;
}
