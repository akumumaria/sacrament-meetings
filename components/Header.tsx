'use client';

export default function Header() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Oak Creek Ward</h1>
            <p className="text-sm text-muted mt-1">Sacrament Meeting Planner</p>
          </div>
          <div className="text-sm text-muted">
            {today}
          </div>
        </div>
      </div>
    </header>
  );
}
