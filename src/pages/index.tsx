import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import HomepageNarrowing from '@site/src/components/HomepageNarrowing';
import HomepageSovereignty from '@site/src/components/HomepageSovereignty';
import HomepageEditions from '@site/src/components/HomepageEditions';
import HomepageCommunity from '@site/src/components/HomepageCommunity';

import styles from './index.module.css';

// The bold lead and the description below it mirror the two-line header of
// the project README. The description lives in siteConfig because it also
// serves as the site's meta description.
function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroLead}>
          The authorization proxy for{' '}
          <Link className={styles.heroLeadLink} href="https://ngsi-ld.org/">
            NGSI-LD
          </Link>{' '}
          context brokers.
        </p>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <HomepageNarrowing />
        <div className={styles.heroButtons}>
          <Link
            className={clsx('button button--lg', styles.heroButtonPrimary)}
            to="/docs/getting-started">
            Get started
          </Link>
          <Link
            className={clsx('button button--lg', styles.heroButtonSecondary)}
            to="/docs/">
            Read the docs
          </Link>
        </div>
        <p className={styles.heroNotice}>
          Open beta, not independently audited. Read the{' '}
          <Link
            className={styles.heroLeadLink}
            to="/docs/security/known-limitations">
            known limitations
          </Link>{' '}
          before putting Libra in front of production data.
        </p>
      </div>
    </header>
  );
}

function Banner() {
  return (
    <div className={styles.banner}>
      <img
        src={useBaseUrl('/img/vela-banner.svg')}
        alt="Wind farm, industrial site, city centre and residential district drawn as connected isometric tiles, the smart-city and IoT platforms whose NGSI-LD context Libra fronts"
        width={7000}
        height={2400}
        loading="lazy"
      />
      <p className={styles.scope}>
        <Link href="https://ngsi-ld.org/">NGSI-LD</Link> is the linked-data
        model used by many smart-city, IoT, and dataspace platforms across
        Europe. Libra sits in front of the context broker you already run and
        stores no context data of its own.
      </p>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    // The Layout title becomes "<title> | Libra". "Libra" alone is ambiguous
    // in a search result, so the page leads with what it is.
    <Layout
      title="Open-source NGSI-LD authorization proxy"
      description={siteConfig.tagline}>
      <Hero />
      <main>
        <Banner />
        <HomepageSovereignty />
        <HomepageEditions />
        <HomepageCommunity />
      </main>
    </Layout>
  );
}
