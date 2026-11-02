import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const siteUrl = 'https://vela-tools.github.io';
const baseUrl = '/libra/';
const siteHome = `${siteUrl}${baseUrl}`;
const asset = (path: string) => `${siteHome}${path}`;

const tagline =
  'Authenticates every request, narrows it to what your policy allows, and filters every response on the way back. No context data stored.';

// Search keywords, used as the default <meta name="keywords"> and as the
// fallback for pages that declare none of their own. NGSI-LD, FIWARE and the
// broker names are the terms people actually search for.
const siteKeywords = [
  'NGSI-LD',
  'NGSI-LD proxy',
  'authorization proxy',
  'authentication proxy',
  'ETSI GS CIM 009',
  'context broker',
  'FIWARE',
  'Scorpio',
  'policy enforcement point',
  'linked data',
  'dataspace',
  'open source',
  'EUPL-1.2',
];

// Site-level JSON-LD. Docusaurus already emits a BreadcrumbList on every doc
// page and src/theme/DocItem/Metadata adds a TechArticle, so this graph only
// carries the three nodes that describe the publisher, the site, and the
// software itself. Kept as one @graph so the nodes can reference each other by
// @id instead of repeating themselves.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteHome}#organization`,
      name: 'Vela Tools',
      legalName: 'SenLab d.o.o.',
      url: 'https://velacontext.com',
      logo: {
        '@type': 'ImageObject',
        url: asset('img/vela.png'),
        width: 512,
        height: 512,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ljubljana',
        addressCountry: 'SI',
      },
      sameAs: [
        'https://github.com/vela-tools',
        'https://velacontext.com',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteHome}#website`,
      url: siteHome,
      name: 'Libra documentation',
      description: tagline,
      inLanguage: 'en',
      publisher: { '@id': `${siteHome}#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteHome}#software`,
      name: 'Libra',
      alternateName: 'Libra NGSI-LD authorization proxy',
      applicationCategory: 'SecurityApplication',
      description:
        'Libra is an authentication and authorization proxy that sits in front of an NGSI-LD context broker. It authenticates the caller, decides against a policy set, narrows the request to what the policy allows, filters the response, and forwards to the broker. It stores no context data.',
      operatingSystem:
        'Linux (container image for linux/amd64 and linux/arm64)',
      programmingLanguage: 'Rust',
      url: siteHome,
      image: asset('img/og-libra.png'),
      downloadUrl: 'https://github.com/vela-tools/libra/releases/latest',
      softwareHelp: { '@id': `${siteHome}#website` },
      license: 'https://eupl.eu/1.2/en/',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
      },
      author: { '@id': `${siteHome}#organization` },
      publisher: { '@id': `${siteHome}#organization` },
    },
  ],
};

const config: Config = {
  title: 'Libra',
  tagline,
  favicon: 'img/favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vela-tools', // Usually your GitHub org/user name.
  projectName: 'libra', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // The three webfonts used to be @import-ed from custom.scss, which chains
  // them behind the bundled stylesheet and delays first paint. Loading them
  // from <head> with a preconnect starts the handshake immediately instead.
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://iosevka-webfonts.github.io',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Audiowide&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://iosevka-webfonts.github.io/iosevka/Iosevka.css',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${baseUrl}img/apple-touch-icon.png`,
      },
    },
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify(structuredData),
    },
  ],

  plugins: [
    'docusaurus-plugin-sass',
    [
      'docusaurus-plugin-llms',
      {
        // The docs are versioned with no current version, so point the plugin
        // straight at the newest published version, the one served at
        // /docs, instead of the default `docs/` directory, which does not
        // exist here.
        docsDir: [
          {
            path: 'versioned_docs/version-1.0.0-beta.1',
            routeBasePath: 'docs',
          },
        ],
        title: 'Libra',
        description: tagline,
        version: '1.0.0-beta.1',
        rootContent: [
          'Libra is an open-source (EUPL-1.2) authentication and authorization proxy that sits in front of an NGSI-LD context broker.',
          'A caller authenticates with an API key Libra issues itself, or with a JWT from an identity provider you already run. Policies written in TOML decide by group, role, user, operation, tenant and resource, and an allowed decision can narrow the request to the entity types, attributes, scopes, and time windows the policy allows.',
          'Libra rewrites the request so the broker is asked only for what the policy allows, then filters the response so nothing outside it reaches the caller. It stores no context data.',
        ].join('\n'),
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        keepFrontMatter: ['title', 'description'],
        excludeImports: true,
        removeDuplicateHeadings: true,
        // The sidebar's order, so llms-full.txt reads like the site rather
        // than alphabetically.
        includeOrder: [
          'index.mdx',
          'getting-started.md',
          'deployment.md',
          'operations.md',
          'troubleshooting.md',
          'authentication/index.md',
          'authentication/api-keys.md',
          'authentication/jwt.md',
          'authentication/keycloak.md',
          'policies/index.md',
          'policies/attribute-restriction.md',
          'policies/entity-type-restriction.md',
          'policies/scope-restriction.md',
          'policies/time-restriction.md',
          'policies/aggregation-restriction.md',
          'policies/linked-entity-retrieval.md',
          'policies/context-source-registrations.md',
          'policies/cookbook.md',
          'examples/index.md',
          'examples/smart-city-fleet.md',
          'examples/multi-tenant-dataspace.md',
          'examples/read-only-dashboard.md',
          'examples/federation.md',
          'examples/api-key-onboarding.md',
          'request-path.mdx',
          'architecture.md',
          'security/threat-model.mdx',
          'security/known-limitations.md',
          'testing.md',
          'reference/cli.md',
          'reference/configuration.md',
          'reference/errors.md',
          'reference/jsonld-broker-parity.md',
          'reference/multi-scope-semantics.md',
          'reference/glossary.md',
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          // Docs live under /docs so the React landing page can own '/'.
          routeBasePath: '/docs',
          // Versioned only, no unversioned `docs/` current version: edits go
          // straight into versioned_docs/version-<v> and each sidebar lives in
          // versioned_sidebars/version-<v>-sidebars.json. The newest entry in
          // versions.json is the default and is served at the site root. To cut
          // the next release, copy both and add the version to versions.json:
          // `docusaurus docs:version` needs a current version and won't work.
          includeCurrentVersion: false,
          // Only the newest version is indexable. An archived version repeats
          // the current one almost word for word, down to the title and the
          // description, so leaving both open puts two URLs in front of a
          // search engine for one query and lets it pick. noIndex keeps the
          // pages reachable for anyone pinned to an older release while taking
          // them out of that contest; the matching sitemap exclusion below
          // stops the site advertising URLs it asks not to be indexed.
          versions: {
            '1.0.0-beta.1': {
              label: 'v1.0.0-beta.1',
            },
          },
          // Feeds the sitemap's <lastmod> from git and shows a freshness date
          // at the foot of each page.
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.scss',
        },
        sitemap: {
          // Google ignores changefreq and priority outright, and reads lastmod
          // only when it is honest; showLastUpdateTime above makes it so.
          changefreq: null,
          priority: null,
          lastmod: 'date',
          // Archived versions are noIndex (see the versions map above), so
          // listing them here would ask a crawler to fetch what it is then told
          // to drop. Extend this when a version stops being the newest.
          ignorePatterns: ['**/search', '**/tags/**'],
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
    // Parse .md as CommonMark (the pages use TOML `#` comments and `<Type>`
    // freely); .mdx files still get full MDX.
    format: 'detect',
  },
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // Default social card. Pages can override it with an `image` front-matter
    // field; nothing does yet, so every share renders this one.
    image: 'img/og-libra.png',
    metadata: [
      { name: 'keywords', content: siteKeywords.join(', ') },
      { name: 'author', content: 'SenLab d.o.o.' },
      { name: 'theme-color', content: '#7c3aed' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Libra' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content:
          'Libra: authenticate, authorize and filter every NGSI-LD request',
      },
      { name: 'twitter:image:alt', content: 'Libra NGSI-LD authorization proxy' },
    ],
    colorMode: {
      defaultMode: 'light',
    },
    navbar: {
      title: 'Libra',
      logo: {
        alt: 'Vela logo',
        src: 'img/vela-context-light.webp',
        srcDark: 'img/vela-context-dark.webp',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'right',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/vela-tools/libra',
          className: 'navbar-github-link',
          'aria-label': 'Libra on GitHub',
          title: 'Libra on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // Simple footer: an icon row and the copyright line, no link columns.
      copyright: `
        <div class="footer-icons">
                  <a href="https://github.com/vela-tools/libra" target="_blank" rel="noopener noreferrer" title="Libra on GitHub" aria-label="Libra on GitHub">
                    <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>
                  </a>
                  <a href="https://github.com/vela-tools/libra/pkgs/container/libra" target="_blank" rel="noopener noreferrer" title="Container image on GHCR" aria-label="Container image on GHCR">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.6 20.5 7v10L12 21.4 3.5 17V7z"/><path d="M3.5 7 12 11.5 20.5 7M12 11.5v9.9"/></svg>
                  </a>
                  <a href="https://velacontext.com" target="_blank" rel="noopener noreferrer" title="Libra on Vela Context" aria-label="Libra on Vela Context">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M12 2.8c2.4 2.5 3.7 5.6 3.7 9.2s-1.3 6.7-3.7 9.2c-2.4-2.5-3.7-5.6-3.7-9.2s1.3-6.7 3.7-9.2Z"/><path d="M3 12h18"/></svg>
                  </a>
        </div>
        <div class="footer-provenance">
          Part of <a href="https://github.com/vela-tools">Vela Tools</a>
          · Based on EU open standards 🇪🇺
          · Built in Ljubljana, Slovenia 🇸🇮
        </div>
        <div class="footer-legal">
          Copyright © ${new Date().getFullYear()} SenLab d.o.o.
          Libra is licensed under the <a href="https://eupl.eu/">EUPL-1.2</a>.
        </div>
      `,
    },
    prism: {
      // github's keyword purple is #6f42c1 (hue 261) against the brand's 262;
      // duotoneDark is purple-duotone throughout, background hue 254.
      theme: prismThemes.github,
      darkTheme: prismThemes.duotoneDark,
      additionalLanguages: ['bash', 'diff', 'http', 'json', 'toml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
