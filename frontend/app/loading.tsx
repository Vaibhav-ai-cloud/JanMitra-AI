export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4"
      role="status"
      aria-label="Loading page content"
    >
      {/* Animated logo pulse — CSS only, no client JS needed */}
      <div className="relative flex h-14 w-14 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500/30" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/35">
          <span className="text-lg font-black text-white" aria-hidden="true">
            JM
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-500">Loading&hellip;</p>
    </div>
  );
}
