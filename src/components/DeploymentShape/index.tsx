import type { ReactNode } from 'react';

import styles from './styles.module.css';

type Kind = 'caller' | 'libra' | 'external';

type Area = 'client' | 'libra' | 'broker' | 'idp';

interface Party {
  area: Area;
  kind: Kind;
  name: string;
  caption: string;
}

// The deployment the threat model reasons about: a client calls Libra, Libra
// calls the broker, and Libra alone fetches signing keys from the identity
// provider. The client is drawn like a caller in the request flows, Libra with
// the brand edge, and the two systems Libra trusts but does not run dashed, as
// the broker is in the request flows.
const parties: Party[] = [
  {
    area: 'client',
    kind: 'caller',
    name: 'Client',
    caption: 'Everything it sends is hostile input.',
  },
  {
    area: 'libra',
    kind: 'libra',
    name: 'Libra',
    caption: 'Authenticates, decides, narrows and filters. The only way in.',
  },
  {
    area: 'broker',
    kind: 'external',
    name: 'Context broker',
    caption: 'No authentication of its own. Trusts what Libra sends.',
  },
  {
    area: 'idp',
    kind: 'external',
    name: 'Identity provider',
    caption: 'Signing keys (JWKS), fetched when JWTs are accepted.',
  },
];

type Arrow = 'toLibra' | 'toBroker' | 'toIdp';

const arrows: Arrow[] = ['toLibra', 'toBroker', 'toIdp'];

export default function DeploymentShape(): ReactNode {
  return (
    <figure
      className={styles.shape}
      aria-label="A client calls Libra, Libra calls the context broker, and Libra fetches signing keys from the identity provider when JWTs are accepted.">
      {parties.map((party) => (
        <div
          key={party.area}
          className={`${styles.node} ${styles[party.kind]} ${styles[party.area]}`}>
          <span className={styles.name}>{party.name}</span>
          <span className={styles.caption}>{party.caption}</span>
        </div>
      ))}
      {arrows.map((arrow) => (
        <span
          key={arrow}
          aria-hidden="true"
          className={`${styles.arrow} ${styles[arrow]}`}
        />
      ))}
    </figure>
  );
}
