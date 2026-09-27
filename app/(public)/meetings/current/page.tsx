import { redirect } from 'next/navigation';
import { getMeetingByDate } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek);

  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  const sundayDate = `${year}-${month}-${day}`;

  // Get meeting by date directly
  const meeting = await getMeetingByDate(sundayDate);

  if (meeting) {
    redirect(`/meetings/${meeting.id}`);
  } else {
    redirect('/meetings');
  }
}
