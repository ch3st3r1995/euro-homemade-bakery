import { defineConfig } from 'astro/config';

// i18n routing: docs.astro.build/en/guides/internationalization/
// prefixDefaultLocale is required because every locale (including English)
// must live under a /xx/ prefix -- there is no un-prefixed root content.
//
// redirectToDefaultLocale is deliberately NOT set. It redirects "/" via
// Astro's i18n middleware, which only runs during a live SSR request --
// this site has no adapter and is served as pure static files from
// S3/CloudFront, so middleware never executes in production. The "/"
// redirect is instead a real static page: src/pages/index.astro.
export default defineConfig({
  site: 'https://eurohomemadebakery.com',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk', 'pl'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
