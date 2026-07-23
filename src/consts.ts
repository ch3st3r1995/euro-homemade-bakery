// Non-localized business facts, shared across all three locales so hours,
// address, and order links can't drift between /en/, /uk/, /pl/.
// Chicago-area single location per CLAUDE.md Section 0.

export const BUSINESS_NAME = 'Euro Homemade Bakery & Deli';

export const ADDRESS = {
  street: '2445 N Harlem Ave',
  city: 'Chicago',
  state: 'IL',
  zip: '60707',
};

export const PHONE = {
  display: '(773) 637-3772',
  href: 'tel:+17736373772',
};

export const HOURS: Array<{ day: string; hours: string }> = [
  { day: 'Monday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '7:00 AM – 7:00 PM' },
  { day: 'Sunday', hours: '9:00 AM – 3:00 PM' },
];

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=2445+N+Harlem+Ave,+Chicago,+IL+60707&output=embed';
export const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2445+N+Harlem+Ave,+Chicago,+IL+60707';

export const DOORDASH_URL = 'https://www.doordash.com/'; // TODO(owner): real store link
export const UBER_EATS_URL = 'https://www.ubereats.com/'; // TODO(owner): real store link
export const INSTAGRAM_URL = 'https://www.instagram.com/euro.homemade/';
