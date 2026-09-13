'use client';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-muted">
          © {new Date().getFullYear()} Oak Creek Ward. Sacrament Meeting Planner.
        </p>
      </div>
    </footer>
  );
}
