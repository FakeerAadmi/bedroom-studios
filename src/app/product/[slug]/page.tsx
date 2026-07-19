export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="font-mono text-xl p-8">
      <h1>Product Page</h1>
      <p className="mt-4 text-ink/60">Current Slug: {slug}</p>
    </div>
  );
}