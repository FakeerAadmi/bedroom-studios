export default async function DynamicInfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="font-mono text-xl p-8">
      <h1>Dynamic Info Page</h1>
      <p className="mt-4 text-ink/60">Current Slug: {slug}</p>
    </div>
  );
}