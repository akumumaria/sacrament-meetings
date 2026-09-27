import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Meeting Not Found</h2>
        <p className="text-muted mb-6">
          The meeting you&apos;re looking for doesn&apos;t exist or has been deleted.
        </p>
        <Link
          href="/meetings"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
