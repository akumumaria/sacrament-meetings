import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Johnson',
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'Brother Taylor', topic: '', type: 'speaker' },
      { name: 'Sister Anderson', topic: '', type: 'speaker' },
      { name: 'Brother Wilson', topic: '', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister Thompson',
    announcements: ['Ward picnic: May 17th at the park']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Garcia',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Lee',
    wardBusiness: [{ description: 'Announcement of new Elder\'s Quorum president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Elder Peterson', topic: 'The Atonement of Jesus Christ', type: 'speaker' },
      { name: 'Sister Clark', topic: 'Family Home Evening', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 67, title: 'Know Ye That the Lord Is God' },
    closingPrayer: 'Sister White',
    announcements: ['Youth conference registration due May 20']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President Anderson',
    conducting: 'Stake President Anderson',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Harris',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 176, title: 'Away in a Manger' },
    speakers: [
      { name: 'Stake President Anderson', topic: 'Building Faith in Our Communities', type: 'speaker' },
      { name: 'Sister Martinez', topic: 'Service in the Ward', type: 'speaker' }
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Brother Brown',
    announcements: ['Stake youth activity: June 1st']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Miller',
    openingHymn: { number: 19, title: 'The Earth Is the Lord\'s' },
    openingPrayer: 'Sister Davis',
    wardBusiness: [{ description: 'Callings to be sustained' }],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Brother Robinson', topic: 'Temple Worship', type: 'speaker' },
      { name: 'Sister Young', topic: 'Prayer in Our Lives', type: 'speaker' },
      { name: 'Primary Children', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 76, title: 'God of Our Fathers, Whose Almighty Hand' },
    closingPrayer: 'Brother Garcia',
    announcements: ['Fast Sunday next week', 'Ward cleanup: June 3rd']
  },
  {
    id: 6,
    date: '2026-09-13',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Johnson',
    openingHymn: { number: 71, title: 'With Songs of Praise' },
    openingPrayer: 'Sister Martinez',
    wardBusiness: [{ description: 'Announcement of new youth activities' }],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While We Are Young' },
    speakers: [
      { name: 'Brother Thompson', topic: 'Service to Others', type: 'speaker' },
      { name: 'Sister Wilson', topic: 'Family Prayer', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 95, title: 'Now, We\'ll Sing with One Accord' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward conference next month', 'Temple trip: September 20th']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}
