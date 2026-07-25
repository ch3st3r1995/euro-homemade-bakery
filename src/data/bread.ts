// Bread varieties for the "Our Bread" subsection nested under Bakery.
// Names are AI-drafted translations (uk/pl), same "not yet native-reviewed"
// caveat as src/i18n/ui.ts -- flag for a native review pass before final.
import type { Locale } from '../i18n/ui';

export interface BreadVariety {
  image: string; // filename within public/images/bread/
  name: Record<Locale, string>;
}

export const BREAD_VARIETIES: BreadVariety[] = [
  { image: 'bread-rye-100.png', name: { en: '100% Rye', uk: '100% житній', pl: 'Chleb żytni 100%' } },
  {
    image: 'bread-wheat-rye.png',
    name: { en: 'Wheat-Rye Bread', uk: 'Пшенично-житній хліб', pl: 'Chleb pszenno-żytni' },
  },
  { image: 'bread-french.png', name: { en: 'French Bread', uk: 'Французький хліб', pl: 'Chleb francuski' } },
  { image: 'bread-baguette.png', name: { en: 'Baguette', uk: 'Багетка', pl: 'Bagietka' } },
  {
    image: 'bread-baguette-sesame.png',
    name: { en: 'Baguette with Sesame', uk: 'Багетка з кунжутом', pl: 'Bagietka z sezamem' },
  },
  { image: 'bread-village.png', name: { en: 'Village Bread', uk: 'Сільський хліб', pl: 'Chleb wiejski' } },
  {
    image: 'bread-village-2.png',
    name: { en: 'Village Bread II', uk: 'Сільський хліб 2', pl: 'Chleb wiejski II' },
  },
  { image: 'bread-zakopane.png', name: { en: 'Zakopane Bread', uk: 'Закопянський хліб', pl: 'Chleb zakopiański' } },
  { image: 'bread-potato.png', name: { en: 'Potato Bread', uk: 'Картопляний хліб', pl: 'Chleb ziemniaczany' } },
  {
    image: 'bread-palianytsia.png',
    name: { en: 'Ukrainian Palianytsia', uk: 'Українська паляниця', pl: 'Ukraińska Palanycia' },
  },
  { image: 'bread-toast.png', name: { en: 'Toast Bread', uk: 'Тостовий хліб', pl: 'Chleb tostowy' } },
  { image: 'bread-7-grain.png', name: { en: '7-Grain Bread', uk: 'Хліб 7 зерен', pl: 'Chleb 7 zbóż' } },
  {
    image: 'bread-whole-grain.png',
    name: { en: 'Whole Grain Bread', uk: 'Цільнозерновий хліб', pl: 'Chleb pełnoziarnisty' },
  },
  {
    image: 'bread-whole-grain-2.png',
    name: { en: 'Whole Grain Bread II', uk: 'Цільнозерновий хліб 2', pl: 'Chleb pełnoziarnisty II' },
  },
  {
    image: 'bread-gluten-free-buckwheat.png',
    name: {
      en: 'Gluten-Free Buckwheat Bread',
      uk: 'Хліб без глютену на гречаній муці',
      pl: 'Chleb bezglutenowy z mąki gryczanej',
    },
  },
];
