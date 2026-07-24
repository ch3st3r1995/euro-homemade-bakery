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

// Day identifiers, not display text -- translated per-locale via
// ui[locale].days in src/i18n/ui.ts. Hours use 24-hour format since it
// needs no per-locale translation (unlike 12-hour AM/PM, an English/US
// convention).
export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const HOURS: Array<{ day: DayKey; hours: string }> = [
  { day: 'monday', hours: '08:00–20:00' },
  { day: 'tuesday', hours: '08:00–20:00' },
  { day: 'wednesday', hours: '08:00–20:00' },
  { day: 'thursday', hours: '08:00–20:00' },
  { day: 'friday', hours: '08:00–20:00' },
  { day: 'saturday', hours: '07:00–19:00' },
  { day: 'sunday', hours: '09:00–15:00' },
];

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=2445+N+Harlem+Ave,+Chicago,+IL+60707&output=embed';
export const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2445+N+Harlem+Ave,+Chicago,+IL+60707';

export const DOORDASH_URL = 'https://www.doordash.com/'; // TODO(owner): real store link
export const UBER_EATS_URL = 'https://www.ubereats.com/'; // TODO(owner): real store link
export const INSTAGRAM_URL = 'https://www.instagram.com/euro.homemade/';
