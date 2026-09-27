import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import EditMeetingForm from './EditMeetingForm';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);
  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm meeting={meeting} />;
}
