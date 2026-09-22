export default function MeetingsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-border rounded w-1/3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-lg bg-card p-6">
              <div className="h-6 bg-border rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-border rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
