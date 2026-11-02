import type { ReactNode } from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

export default function HomepageEditions(): ReactNode {
  return (
    <section className={styles.editions}>
      <div className="container">
        <Heading as="h2" className={styles.title}>
          Editions
        </Heading>
        <p className={styles.body}>
          Libra is open core. The FOSS edition is complete on its own: it
          authenticates, decides, and enforces without a licence key, account,
          or call-home check, and everything released in it stays in it. Pro
          adds operational capabilities around the same proxy: policy and key
          management over HTTP with hot reload, several replicas on a shared
          key store, resilience against a failing broker, rate limiting per
          principal and tenant, an NGSI-LD response cache, request
          deduplication, identity provider integration, and federation.{' '}
          <Link to="/docs/editions">What each edition holds</Link>.
        </p>
      </div>
    </section>
  );
}
