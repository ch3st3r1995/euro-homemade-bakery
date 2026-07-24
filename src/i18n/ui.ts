// UI chrome strings (nav, buttons, footer) -- not page prose, so these live
// here rather than in content collections.
//
// uk/pl are AI-drafted translations (not reviewed by a native speaker) --
// functionally correct and no longer raw English, but flag for a native
// review pass before treating the wording as final.

import type { DayKey } from '../consts';

export const locales = ['en', 'uk', 'pl'] as const;
export type Locale = (typeof locales)[number];

type UiStrings = {
  nav: { home: string; about: string; catering: string; contact: string };
  orderOnline: { doordash: string; ubereats: string };
  directions: string;
  hours: string;
  days: Record<DayKey, string>;
  languageNames: Record<Locale, string>;
  footer: { legalPrivacy: string; legalTerms: string; followUs: string };
};

const en: UiStrings = {
  nav: { home: 'Home', about: 'Our Story', catering: 'Catering', contact: 'Contact' },
  orderOnline: { doordash: 'Order on DoorDash', ubereats: 'Order on Uber Eats' },
  directions: 'Get Directions',
  hours: 'Hours',
  days: {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  },
  languageNames: { en: 'English', uk: 'Українська', pl: 'Polski' },
  footer: { legalPrivacy: 'Privacy Policy', legalTerms: 'Terms of Service', followUs: 'Follow us' },
};

const uk: UiStrings = {
  nav: { home: 'Головна', about: 'Наша історія', catering: 'Кейтеринг', contact: 'Контакти' },
  orderOnline: { doordash: 'Замовити через DoorDash', ubereats: 'Замовити через Uber Eats' },
  directions: 'Прокласти маршрут',
  hours: 'Години роботи',
  days: {
    monday: 'Понеділок',
    tuesday: 'Вівторок',
    wednesday: 'Середа',
    thursday: 'Четвер',
    friday: "П'ятниця",
    saturday: 'Субота',
    sunday: 'Неділя',
  },
  languageNames: { en: 'English', uk: 'Українська', pl: 'Polski' },
  footer: {
    legalPrivacy: 'Політика конфіденційності',
    legalTerms: 'Умови використання',
    followUs: 'Стежте за нами',
  },
};

const pl: UiStrings = {
  nav: { home: 'Strona główna', about: 'Nasza historia', catering: 'Catering', contact: 'Kontakt' },
  orderOnline: { doordash: 'Zamów przez DoorDash', ubereats: 'Zamów przez Uber Eats' },
  directions: 'Wyznacz trasę',
  hours: 'Godziny otwarcia',
  days: {
    monday: 'Poniedziałek',
    tuesday: 'Wtorek',
    wednesday: 'Środa',
    thursday: 'Czwartek',
    friday: 'Piątek',
    saturday: 'Sobota',
    sunday: 'Niedziela',
  },
  languageNames: { en: 'English', uk: 'Українська', pl: 'Polski' },
  footer: {
    legalPrivacy: 'Polityka prywatności',
    legalTerms: 'Warunki korzystania',
    followUs: 'Śledź nas',
  },
};

export const ui: Record<Locale, UiStrings> = { en, uk, pl };
