// Non-localized business facts, shared across all three locales so hours,
// address, and order links can't drift between /en/, /uk/, /pl/.
// Chicago-area single location per CLAUDE.md Section 0 -- exact street
// address/phone are placeholders pending the owner's real details.

export const BUSINESS_NAME = 'Euro Homemade Bakery & Deli';

export const ADDRESS = {
  street: '000 Main St', // TODO(owner): real street address
  city: 'Chicago',
  state: 'IL',
  zip: '00000', // TODO(owner): real ZIP
};

export const PHONE = {
  display: '(000) 000-0000', // TODO(owner): real phone number
  href: 'tel:+10000000000',
};

export const HOURS: Array<{ day: string; hours: string }> = [
  { day: 'Monday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 7:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 8:00 PM' },
  { day: 'Sunday', hours: '9:00 AM – 5:00 PM' },
]; // TODO(owner): confirm real hours

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Chicago,IL&output=embed'; // TODO(owner): replace with real address embed
export const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Chicago,IL'; // TODO(owner): replace with real address

export const DOORDASH_URL = 'https://www.doordash.com/'; // TODO(owner): real store link
export const UBER_EATS_URL = 'https://www.ubereats.com/'; // TODO(owner): real store link
export const INSTAGRAM_URL = 'https://www.instagram.com/euro.homemade/';
