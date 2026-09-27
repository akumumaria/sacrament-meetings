'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { createMeeting } from '@/lib/actions';
import Link from 'next/link';

const initialState = {
  message: '',
  errors: {},
};

export default function NewMeetingPage() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);
  const [announcements, setAnnouncements] = useState<string[]>(['']);
  const [wardBusiness, setWardBusiness] = useState<{ description: string }[]>([{ description: '' }]);
  const [speakers, setSpeakers] = useState<{ name: string; topic: string; type: 'speaker' | 'musical-number' }[]>([
    { name: '', topic: '', type: 'speaker' }
  ]);

  const addAnnouncement = () => setAnnouncements([...announcements, '']);
  const removeAnnouncement = (index: number) => setAnnouncements(announcements.filter((_, i) => i !== index));
  const updateAnnouncement = (index: number, value: string) => {
    const updated = [...announcements];
    updated[index] = value;
    setAnnouncements(updated);
  };

  const addWardBusiness = () => setWardBusiness([...wardBusiness, { description: '' }]);
  const removeWardBusiness = (index: number) => setWardBusiness(wardBusiness.filter((_, i) => i !== index));
  const updateWardBusiness = (index: number, value: string) => {
    const updated = [...wardBusiness];
    updated[index].description = value;
    setWardBusiness(updated);
  };

  const addSpeaker = () => setSpeakers([...speakers, { name: '', topic: '', type: 'speaker' }]);
  const removeSpeaker = (index: number) => setSpeakers(speakers.filter((_, i) => i !== index));
  const updateSpeaker = (index: number, field: keyof typeof speakers[0], value: string) => {
    const updated = [...speakers];
    updated[index][field] = value as never;
    setSpeakers(updated);
  };

  async function handleSubmit(formData: FormData) {
    formData.set('announcements', JSON.stringify(announcements.filter(a => a.trim())));
    formData.set('wardBusiness', JSON.stringify(wardBusiness.filter(w => w.description.trim())));
    formData.set('speakers', JSON.stringify(speakers.filter(s => s.name.trim())));
    
    // Build hymn objects from separate number/title fields
    const openingHymn = {
      number: parseInt(formData.get('openingHymnNumber') as string),
      title: formData.get('openingHymnTitle') as string
    };
    const sacramentHymn = {
      number: parseInt(formData.get('sacramentHymnNumber') as string),
      title: formData.get('sacramentHymnTitle') as string
    };
    const closingHymn = {
      number: parseInt(formData.get('closingHymnNumber') as string),
      title: formData.get('closingHymnTitle') as string
    };
    
    formData.set('openingHymn', JSON.stringify(openingHymn));
    formData.set('sacramentHymn', JSON.stringify(sacramentHymn));
    formData.set('closingHymn', JSON.stringify(closingHymn));
    
    return formAction(formData);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/meetings" className="text-primary hover:underline">
          ← Back to Meetings
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Create New Meeting</h1>
      
      {state.message && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg" role="alert" aria-live="polite">
          <p className="text-destructive font-medium">{state.message}</p>
        </div>
      )}
      
      <form action={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              aria-describedby="date-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.date && (
              <div id="date-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.date[0]}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="meetingType" className="block text-sm font-medium text-foreground mb-2">
              Meeting Type *
            </label>
            <select
              id="meetingType"
              name="meetingType"
              required
              aria-describedby="meetingType-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="regular">Regular</option>
              <option value="testimony">Testimony</option>
              <option value="stake">Stake</option>
              <option value="general">General</option>
              <option value="special">Special</option>
            </select>
            {state.errors?.meetingType && (
              <div id="meetingType-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.meetingType[0]}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="presiding" className="block text-sm font-medium text-foreground mb-2">
              Presiding *
            </label>
            <input
              type="text"
              id="presiding"
              name="presiding"
              required
              aria-describedby="presiding-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.presiding && (
              <div id="presiding-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.presiding[0]}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="conducting" className="block text-sm font-medium text-foreground mb-2">
              Conducting *
            </label>
            <input
              type="text"
              id="conducting"
              name="conducting"
              required
              aria-describedby="conducting-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.conducting && (
              <div id="conducting-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.conducting[0]}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Announcements</label>
          {announcements.map((announcement, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={announcement}
                onChange={(e) => updateAnnouncement(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Announcement text"
                aria-label={`Announcement ${index + 1}`}
              />
              {announcements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAnnouncement(index)}
                  className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg"
                  aria-label={`Remove announcement ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAnnouncement}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
          >
            Add Announcement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-foreground mb-2">
              Opening Hymn Number *
            </label>
            <input
              type="number"
              id="openingHymnNumber"
              name="openingHymnNumber"
              required
              min="1"
              aria-describedby="openingHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          <div>
            <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-foreground mb-2">
              Opening Hymn Title *
            </label>
            <input
              type="text"
              id="openingHymnTitle"
              name="openingHymnTitle"
              required
              aria-describedby="openingHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.openingHymn && (
              <div id="openingHymn-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.openingHymn[0]}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-foreground mb-2">
            Opening Prayer *
          </label>
          <input
            type="text"
            id="openingPrayer"
            name="openingPrayer"
            required
            aria-describedby="openingPrayer-error"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
          {state.errors?.openingPrayer && (
            <div id="openingPrayer-error" className="mt-1 text-sm text-destructive" aria-live="polite">
              {state.errors.openingPrayer[0]}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Ward Business</label>
          {wardBusiness.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateWardBusiness(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                placeholder="Business description"
                aria-label={`Ward business item ${index + 1}`}
              />
              {wardBusiness.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeWardBusiness(index)}
                  className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg"
                  aria-label={`Remove ward business item ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addWardBusiness}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
          >
            Add Ward Business
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="stakeBusiness"
            name="stakeBusiness"
            value="true"
            className="w-4 h-4"
          />
          <label htmlFor="stakeBusiness" className="text-sm font-medium text-foreground">
            Stake Business
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-foreground mb-2">
              Sacrament Hymn Number *
            </label>
            <input
              type="number"
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              required
              min="1"
              aria-describedby="sacramentHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          <div>
            <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-foreground mb-2">
              Sacrament Hymn Title *
            </label>
            <input
              type="text"
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              required
              aria-describedby="sacramentHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.sacramentHymn && (
              <div id="sacramentHymn-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.sacramentHymn[0]}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Speakers / Musical Numbers</label>
          {speakers.map((speaker, index) => (
            <div key={index} className="border border-border rounded-lg p-4 mb-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <input
                  type="text"
                  value={speaker.name}
                  onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Name"
                  aria-label={`Speaker ${index + 1} name`}
                />
                <input
                  type="text"
                  value={speaker.topic}
                  onChange={(e) => updateSpeaker(index, 'topic', e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  placeholder="Topic"
                  aria-label={`Speaker ${index + 1} topic`}
                />
                <select
                  value={speaker.type}
                  onChange={(e) => updateSpeaker(index, 'type', e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                  aria-label={`Speaker ${index + 1} type`}
                >
                  <option value="speaker">Speaker</option>
                  <option value="musical-number">Musical Number</option>
                </select>
              </div>
              {speakers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSpeaker(index)}
                  className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg"
                  aria-label={`Remove speaker ${index + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addSpeaker}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
          >
            Add Speaker
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-foreground mb-2">
              Closing Hymn Number *
            </label>
            <input
              type="number"
              id="closingHymnNumber"
              name="closingHymnNumber"
              required
              min="1"
              aria-describedby="closingHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>
          <div>
            <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-foreground mb-2">
              Closing Hymn Title *
            </label>
            <input
              type="text"
              id="closingHymnTitle"
              name="closingHymnTitle"
              required
              aria-describedby="closingHymn-error"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
            {state.errors?.closingHymn && (
              <div id="closingHymn-error" className="mt-1 text-sm text-destructive" aria-live="polite">
                {state.errors.closingHymn[0]}
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-foreground mb-2">
            Closing Prayer *
          </label>
          <input
            type="text"
            id="closingPrayer"
            name="closingPrayer"
            required
            aria-describedby="closingPrayer-error"
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
          />
          {state.errors?.closingPrayer && (
            <div id="closingPrayer-error" className="mt-1 text-sm text-destructive" aria-live="polite">
              {state.errors.closingPrayer[0]}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : 'Create Meeting'}
          </button>
          <Link
            href="/meetings"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
