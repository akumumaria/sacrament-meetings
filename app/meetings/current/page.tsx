import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const sundayDate = `${year}-${month}-${day}`;

  const meetings = getMeetings(sundayDate);

  if (meetings.length > 0) {
    redirect(`/meetings/${meetings[0].id}`);
  } else {
    redirect('/meetings');
  }
}
