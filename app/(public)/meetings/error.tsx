'use client';

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong!</h2>
        <p className="text-muted mb-6">
          {error.message || 'An error occurred while loading the meetings.'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Try Again
          </button>
          <Link
            href="/meetings"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
          >
            Back to Meetings
          </Link>
        </div>
      </div>
    </div>
  );
}
