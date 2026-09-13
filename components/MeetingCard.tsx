'use client';

import Link from 'next/link';
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
    general: 'General Conference'
  };

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className="block border border-border rounded-lg bg-card p-6 hover:border-primary transition-colors cursor-pointer"
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
  );
}
