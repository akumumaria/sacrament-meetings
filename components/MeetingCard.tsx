'use client';

import Link from 'next/link';
import { deleteMeetingAction } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const meetingTypeLabels: Record<string, string> = {
    regular: 'Regular',
    testimony: 'Testimony',
    stake: 'Stake Conference',
    general: 'General Conference',
    special: 'Special'
  };

  async function handleDelete() {
    try {
      await deleteMeetingAction(meeting.id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete meeting');
    }
  }

  return (
    <div className="border border-border rounded-lg bg-card p-6">
      <Link
        href={`/meetings/${meeting.id}`}
        className="block hover:border-primary transition-colors cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{formattedDate}</h3>
            <p className="text-sm text-muted mt-1">
              {meetingTypeLabels[meeting.meetingType]}
            </p>
          </div>
          <div className="text-sm text-muted">
            <p>Conducting: {meeting.conducting}</p>
            <p>Presiding: {meeting.presiding}</p>
          </div>
        </div>
      </Link>
      <div className="flex gap-2 mt-4 pt-4 border-t border-border">
        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Edit
        </Link>
        <form action={handleDelete} onSubmit={(e) => e.stopPropagation()}>
          <button
            type="submit"
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 text-sm"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
