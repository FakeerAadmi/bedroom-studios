export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-4 py-40">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-sm">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40">
        Loading...
      </p>
    </div>
  );
}
