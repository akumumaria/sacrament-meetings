'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addMeeting, updateMeeting, deleteMeeting, getUserByEmail, createUser } from './meetings-db';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymn?: string[];
    openingPrayer?: string[];
    sacramentHymn?: string[];
    closingHymn?: string[];
    closingPrayer?: string[];
  };
  message?: string;
};

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().min(1, 'Presiding leader is required'),
  conducting: z.string().min(1, 'Conducting leader is required'),
  announcements: z.array(z.string()).optional(),
  openingHymn: z.object({
    number: z.number().min(1),
    title: z.string().min(1),
  }),
  openingPrayer: z.string().min(1, 'Opening prayer is required'),
  wardBusiness: z.array(z.object({
    description: z.string(),
  })).optional(),
  stakeBusiness: z.boolean().default(false),
  sacramentHymn: z.object({
    number: z.number().min(1),
    title: z.string().min(1),
  }),
  speakers: z.array(z.object({
    name: z.string(),
    topic: z.string(),
    type: z.enum(['speaker', 'musical-number']),
  })).optional(),
  closingHymn: z.object({
    number: z.number().min(1),
    title: z.string().min(1),
  }),
  closingPrayer: z.string().min(1, 'Closing prayer is required'),
});

export async function createMeeting(prevState: State, formData: FormData) {
  const announcementsValue = formData.get('announcements');
  const openingHymnValue = formData.get('openingHymn');
  const wardBusinessValue = formData.get('wardBusiness');
  const sacramentHymnValue = formData.get('sacramentHymn');
  const speakersValue = formData.get('speakers');
  const closingHymnValue = formData.get('closingHymn');

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: announcementsValue ? JSON.parse(announcementsValue as string) as string[] : [],
    openingHymn: openingHymnValue ? JSON.parse(openingHymnValue as string) as { number: number; title: string } : { number: 1, title: '' },
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: wardBusinessValue ? JSON.parse(wardBusinessValue as string) as { description: string }[] : [],
    stakeBusiness: formData.get('stakeBusiness') === 'true',
    sacramentHymn: sacramentHymnValue ? JSON.parse(sacramentHymnValue as string) as { number: number; title: string } : { number: 1, title: '' },
    speakers: speakersValue ? JSON.parse(speakersValue as string) as { name: string; topic: string; type: 'speaker' | 'musical-number' }[] : [],
    closingHymn: closingHymnValue ? JSON.parse(closingHymnValue as string) as { number: number; title: string } : { number: 1, title: '' },
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create meeting.',
    };
  }

  const data = validatedFields.data;

  // Ensure optional fields have default values
  const meetingData = {
    ...data,
    announcements: data.announcements || [],
    wardBusiness: data.wardBusiness || [],
    speakers: data.speakers || [],
  };

  try {
    await addMeeting(meetingData);
  } catch {
    return {
      message: 'Failed to create meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeetingAction(prevState: State, formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  const announcementsValue = formData.get('announcements');
  const openingHymnValue = formData.get('openingHymn');
  const wardBusinessValue = formData.get('wardBusiness');
  const sacramentHymnValue = formData.get('sacramentHymn');
  const speakersValue = formData.get('speakers');
  const closingHymnValue = formData.get('closingHymn');

  const validatedFields = MeetingFormSchema.safeParse({
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: announcementsValue ? JSON.parse(announcementsValue as string) as string[] : undefined,
    openingHymn: openingHymnValue ? JSON.parse(openingHymnValue as string) as { number: number; title: string } : undefined,
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: wardBusinessValue ? JSON.parse(wardBusinessValue as string) as { description: string }[] : undefined,
    stakeBusiness: formData.get('stakeBusiness') === 'true',
    sacramentHymn: sacramentHymnValue ? JSON.parse(sacramentHymnValue as string) as { number: number; title: string } : undefined,
    speakers: speakersValue ? JSON.parse(speakersValue as string) as { name: string; topic: string; type: 'speaker' | 'musical-number' }[] : undefined,
    closingHymn: closingHymnValue ? JSON.parse(closingHymnValue as string) as { number: number; title: string } : undefined,
    closingPrayer: formData.get('closingPrayer'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to update meeting.',
    };
  }

  const updates = validatedFields.data;

  try {
    await updateMeeting(id, updates);
  } catch {
    return {
      message: 'Failed to update meeting. Please try again.',
    };
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeetingAction(id: number) {
  try {
    await deleteMeeting(id);
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid email or password.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // Validate passwords match
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  // Validate password length
  if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return 'An account with this email already exists.';
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  try {
    await createUser({
      email,
      name,
      passwordHash,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return 'Failed to create account. Please try again.';
  }

  // Redirect to login page
  redirect('/login');
}
