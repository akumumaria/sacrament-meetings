import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting, User } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
  meetingType: string = ''
): Promise<SacramentMeeting[]> {
  try {
    const searchTerm = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE
        (presiding     ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm})
        ${meetingType ? sql`AND meeting_type = ${meetingType}` : sql``}
      ORDER BY date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return rows as unknown as SacramentMeeting[];
  } catch (error) {
    console.error('Error fetching meetings:', error);
    throw new Error('Failed to fetch meetings. Please try again.');
  }
}

export async function getMeetingsTotalPages(
  query: string = '',
  meetingType: string = ''
): Promise<number> {
  try {
    const searchTerm = `%${query}%`;
    const rows = await sql`
      SELECT COUNT(*) FROM meetings
      WHERE
        (presiding     ILIKE ${searchTerm}
        OR conducting ILIKE ${searchTerm}
        OR meeting_type ILIKE ${searchTerm}
        OR speakers::text ILIKE ${searchTerm})
        ${meetingType ? sql`AND meeting_type = ${meetingType}` : sql``}
    `;
    return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error('Error fetching total pages:', error);
    throw new Error('Failed to fetch total pages. Please try again.');
  }
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings WHERE id = ${id}
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error('Error fetching meeting by ID:', error);
    throw new Error('Failed to fetch meeting. Please try again.');
  }
}

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  try {
    const rows = await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting, announcements,
        opening_hymn, opening_prayer, ward_business, stake_business,
        sacrament_hymn, speakers, closing_hymn, closing_prayer
      ) VALUES (
        ${data.date},
        ${data.meetingType},
        ${data.presiding},
        ${data.conducting},
        ${data.announcements || []},
        ${JSON.stringify(data.openingHymn)},
        ${data.openingPrayer},
        ${JSON.stringify(data.wardBusiness)},
        ${data.stakeBusiness},
        ${JSON.stringify(data.sacramentHymn)},
        ${JSON.stringify(data.speakers)},
        ${JSON.stringify(data.closingHymn)},
        ${data.closingPrayer}
      )
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
    `;
    return rows[0] as unknown as SacramentMeeting;
  } catch (error) {
    console.error('Error adding meeting:', error);
    throw new Error('Failed to add meeting. Please try again.');
  }
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      UPDATE meetings
      SET
        date = COALESCE(${updates.date}, date),
        meeting_type = COALESCE(${updates.meetingType}, meeting_type),
        presiding = COALESCE(${updates.presiding}, presiding),
        conducting = COALESCE(${updates.conducting}, conducting),
        announcements = COALESCE(${updates.announcements}, announcements),
        opening_hymn = COALESCE(${updates.openingHymn ? JSON.stringify(updates.openingHymn) : null}, opening_hymn),
        opening_prayer = COALESCE(${updates.openingPrayer}, opening_prayer),
        ward_business = COALESCE(${updates.wardBusiness ? JSON.stringify(updates.wardBusiness) : null}, ward_business),
        stake_business = COALESCE(${updates.stakeBusiness}, stake_business),
        sacrament_hymn = COALESCE(${updates.sacramentHymn ? JSON.stringify(updates.sacramentHymn) : null}, sacrament_hymn),
        speakers = COALESCE(${updates.speakers ? JSON.stringify(updates.speakers) : null}, speakers),
        closing_hymn = COALESCE(${updates.closingHymn ? JSON.stringify(updates.closingHymn) : null}, closing_hymn),
        closing_prayer = COALESCE(${updates.closingPrayer}, closing_prayer)
      WHERE id = ${id}
      RETURNING
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Failed to update meeting. Please try again.');
  }
}

export async function deleteMeeting(id: number): Promise<boolean> {
  try {
    const rows = await sql`DELETE FROM meetings WHERE id = ${id} RETURNING id`;
    return rows.length > 0;
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again.');
  }
}

export async function getMeetingByDate(date: string): Promise<SacramentMeeting | null> {
  try {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding, conducting, announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings WHERE date = ${date}
    `;
    return (rows[0] as unknown as SacramentMeeting) ?? null;
  } catch (error) {
    console.error('Error fetching meeting by date:', error);
    throw new Error('Failed to fetch meeting. Please try again.');
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const rows = await sql`
      SELECT id::text, email, name, password_hash AS "passwordHash"
      FROM users WHERE email = ${email}
    `;
    return (rows[0] as unknown as User) ?? null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Failed to fetch user. Please try again.');
  }
}

export async function createUser(data: Omit<User, 'id'>): Promise<User> {
  try {
    const rows = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${data.email}, ${data.name}, ${data.passwordHash})
      RETURNING id::text, email, name, password_hash AS "passwordHash"
    `;
    return rows[0] as unknown as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user. Please try again.');
  }
}
