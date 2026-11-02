import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './styles.module.css';

// Condensed from the Sovereignty section of the project README.
const points = [
  {
    label: 'An EU open standard',
    body: 'Libra speaks ETSI NGSI-LD rather than a vendor-specific API, so it fronts the context broker you choose instead of locking you into one.',
  },
  {
    label: 'Your policies, your repository',
    body: 'Policies are plain TOML files you keep and version yourself. The broker stays exactly as it is, and the caller credential stops at Libra.',
  },
  {
    label: 'Your machines',
    body: 'The FOSS edition runs under the EUPL-1.2 with no account, no licence key, and no telemetry.',
  },
];

export default function HomepageSovereignty(): ReactNode {
  return (
    <section className={styles.sovereignty}>
      <div className="container">
        <Heading as="h2" className={styles.title}>
          Sovereignty
        </Heading>
        <p className={styles.lead}>
          The access rules decide who gets your data, so they belong to you.
        </p>

        <div className={styles.points}>
          {points.map((point) => (
            <div key={point.label} className="home-card">
              <h3 className="home-card__label">{point.label}</h3>
              <p className="home-card__body">{point.body}</p>
            </div>
          ))}
        </div>

        <p className={styles.more}>
          SenLab's full position on ownership, export, and reversibility is at{' '}
          <Link href="https://velacontext.com/sovereignty">
            velacontext.com/sovereignty
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
