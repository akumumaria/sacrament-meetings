import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';

export default async function MeetingsPage() {
  const meetings = getMeetings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Sacrament Meetings</h1>
      <div className="grid grid-cols-1 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
