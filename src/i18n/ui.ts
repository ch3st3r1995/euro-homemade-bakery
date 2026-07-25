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
  bread: { heading: string; intro: string };
  story: { heading: string; readMore: string };
  instagramCta: string;
  contactForm: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    notConfigured: string;
  };
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
  bread: {
    heading: 'Our Bread',
    intro: "All ~15 varieties baked in-house daily -- see something you like? It's fresh at the counter every day.",
  },
  story: { heading: 'Our Story', readMore: 'Read our full story' },
  instagramCta: 'Follow us on Instagram',
  contactForm: {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    success: "Thanks -- we received your message and will be in touch.",
    error: 'Something went wrong -- please call or email us directly.',
    notConfigured: 'Contact form is not configured yet -- please call or email us directly.',
  },
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
  bread: {
    heading: 'Наш хліб',
    intro:
      'Усі приблизно 15 видів хліба випікаються щодня на місці -- сподобалось щось? Це завжди свіже на прилавку.',
  },
  story: { heading: 'Наша історія', readMore: 'Читати нашу історію повністю' },
  instagramCta: 'Стежте за нами в Instagram',
  contactForm: {
    name: "Ім'я",
    email: 'Електронна пошта',
    phone: 'Телефон',
    subject: 'Тема',
    message: 'Повідомлення',
    send: 'Надіслати',
    sending: 'Надсилання...',
    success: "Дякуємо -- ми отримали ваше повідомлення і незабаром з вами зв'яжемося.",
    error: 'Щось пішло не так -- будь ласка, зателефонуйте або напишіть нам напряму.',
    notConfigured: 'Форма зв\'язку ще не налаштована -- будь ласка, зателефонуйте або напишіть нам напряму.',
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
  bread: {
    heading: 'Nasze pieczywo',
    intro:
      'Wszystkie około 15 rodzajów pieczywa pieczone są na miejscu każdego dnia -- coś się spodobało? Zawsze świeże przy ladzie.',
  },
  story: { heading: 'Nasza historia', readMore: 'Przeczytaj naszą pełną historię' },
  instagramCta: 'Śledź nas na Instagramie',
  contactForm: {
    name: 'Imię',
    email: 'E-mail',
    phone: 'Telefon',
    subject: 'Temat',
    message: 'Wiadomość',
    send: 'Wyślij wiadomość',
    sending: 'Wysyłanie...',
    success: 'Dziękujemy -- otrzymaliśmy Twoją wiadomość i wkrótce się odezwiemy.',
    error: 'Coś poszło nie tak -- zadzwoń lub napisz do nas bezpośrednio.',
    notConfigured: 'Formularz kontaktowy nie jest jeszcze skonfigurowany -- zadzwoń lub napisz do nas bezpośrednio.',
  },
};

export const ui: Record<Locale, UiStrings> = { en, uk, pl };
