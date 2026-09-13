'use client';

import type { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  const formattedDate = new Date(meeting.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const meetingTypeLabels: Record<string, string> = {
    regular: 'Regular Sacrament Meeting',
    testimony: 'Fast Sunday Testimony Meeting',
    stake: 'Stake Conference',
    general: 'General Conference'
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground">{formattedDate}</h1>
        <p className="text-lg text-muted mt-2">{meetingTypeLabels[meeting.meetingType]}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <span className="font-medium text-foreground">Presiding:</span>{' '}
            <span className="text-muted">{meeting.presiding}</span>
          </p>
          <p>
            <span className="font-medium text-foreground">Conducting:</span>{' '}
            <span className="text-muted">{meeting.conducting}</span>
          </p>
        </div>
      </div>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Announcements</h2>
          <ul className="list-disc list-inside space-y-2 text-muted">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <p className="min-w-[120px] font-medium text-foreground">Opening Hymn:</p>
          <p className="text-muted">
            <span className="font-medium text-foreground">#{meeting.openingHymn.number}</span>{' '}
            {meeting.openingHymn.title}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <p className="min-w-[120px] font-medium text-foreground">Opening Prayer:</p>
          <p className="text-muted">{meeting.openingPrayer}</p>
        </div>
      </section>

      {meeting.wardBusiness.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Ward Business</h2>
          <ul className="list-disc list-inside space-y-2 text-muted">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        </section>
      )}

      {meeting.stakeBusiness && (
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Stake Business</h2>
          <p className="text-muted">Stake business will be conducted during this meeting.</p>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <p className="min-w-[120px] font-medium text-foreground">Sacrament Hymn:</p>
          <p className="text-muted">
            <span className="font-medium text-foreground">#{meeting.sacramentHymn.number}</span>{' '}
            {meeting.sacramentHymn.title}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">Speakers & Musical Numbers</h2>
        <ul className="space-y-3">
          {meeting.speakers.map((speaker, index) => (
            <li key={index} className="text-muted">
              {speaker.type === 'musical-number' ? (
                <span className="italic">🎵 {speaker.name}</span>
              ) : (
                speaker.name
              )}
              {speaker.topic && (
                <span className="ml-2 text-sm">— {speaker.topic}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <div className="flex items-start gap-4">
          <p className="min-w-[120px] font-medium text-foreground">Closing Hymn:</p>
          <p className="text-muted">
            <span className="font-medium text-foreground">#{meeting.closingHymn.number}</span>{' '}
            {meeting.closingHymn.title}
          </p>
        </div>

        <div className="flex items-start gap-4">
          <p className="min-w-[120px] font-medium text-foreground">Closing Prayer:</p>
          <p className="text-muted">{meeting.closingPrayer}</p>
        </div>
      </section>
    </div>
  );
}
