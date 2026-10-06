import type { Metadata } from 'next';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import { MeetingTypeFilter } from '@/components/MeetingTypeFilter';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

export const metadata: Metadata = {
  title: 'Meetings',
  description: 'View and manage sacrament meeting agendas',
};

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string; type?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;
  const meetingType = searchParams?.type ?? '';

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage, meetingType),
    getMeetingsTotalPages(query, meetingType),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Sacrament Meetings</h1>
      <div className="mb-6 space-y-4">
        <MeetingSearch />
        <MeetingTypeFilter />
      </div>
      <div className="grid grid-cols-1 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
