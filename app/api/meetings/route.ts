import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date');
  const meetings = await getMeetings(date ?? '', 1);
  return Response.json(meetings);
}
