import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-1">
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            Plan and manage sacrament meeting agendas efficiently. View, organize, and print
            meeting programs for bishoprics, branch leaders, and ward members.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/meetings"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-background bg-primary hover:bg-primary-light transition-colors"
            >
              View Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="inline-flex items-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-card hover:bg-border transition-colors"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-border rounded-lg bg-card p-6">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="text-lg font-semibold text-foreground">Meeting Scheduling</h3>
            <p className="mt-2 text-sm text-muted">
              Create and manage sacrament meeting entries for each Sunday with different meeting types.
            </p>
          </div>

          <div className="border border-border rounded-lg bg-card p-6">
            <div className="text-2xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-foreground">Agenda Management</h3>
            <p className="mt-2 text-sm text-muted">
              Track announcements, prayers, hymns, speakers, musical numbers, and ward business.
            </p>
          </div>

          <div className="border border-border rounded-lg bg-card p-6">
            <div className="text-2xl mb-3">🖨️</div>
            <h3 className="text-lg font-semibold text-foreground">Print Programs</h3>
            <p className="mt-2 text-sm text-muted">
              View and print meeting programs for current and past weeks.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
