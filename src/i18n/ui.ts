// UI chrome strings (nav, buttons, footer) -- not page prose, so these live
// here rather than in content collections. uk/pl are untranslated copies of
// en until a human translates them (see CLAUDE.md Section 1).

export const locales = ['en', 'uk', 'pl'] as const;
export type Locale = (typeof locales)[number];

type UiStrings = {
  nav: { home: string; about: string; catering: string; contact: string };
  orderOnline: { doordash: string; ubereats: string };
  directions: string;
  hours: string;
  languageNames: Record<Locale, string>;
  footer: { legalPrivacy: string; legalTerms: string; followUs: string };
};

// TODO(owner/translator): uk and pl are untranslated placeholders (English
// copy). Flagging per CLAUDE.md Section 2's translation-pass instruction.
const en: UiStrings = {
  nav: { home: 'Home', about: 'Our Story', catering: 'Catering', contact: 'Contact' },
  orderOnline: { doordash: 'Order on DoorDash', ubereats: 'Order on Uber Eats' },
  directions: 'Get Directions',
  hours: 'Hours',
  languageNames: { en: 'English', uk: 'Українська', pl: 'Polski' },
  footer: { legalPrivacy: 'Privacy Policy', legalTerms: 'Terms of Service', followUs: 'Follow us' },
};

const uk: UiStrings = { ...en }; // TODO(owner/translator): translate to Ukrainian
const pl: UiStrings = { ...en }; // TODO(owner/translator): translate to Polish

export const ui: Record<Locale, UiStrings> = { en, uk, pl };
