import type { ReactNode } from 'react';

import styles from './styles.module.css';

type Kind = 'caller' | 'libra' | 'broker';

interface Step {
  kind: Kind;
  name: string;
  caption: string;
  refuse?: string;
}

// The five stages of the request path as one vertical flow: what the caller
// sends, the three stages Libra runs on the way in, the broker, and the filter
// on the way back. The refusal chips name the only two answers a caller can
// get that are not a narrowed response.
const steps: Step[] = [
  {
    kind: 'caller',
    name: 'Caller',
    caption: 'A client of the context data: a service, a script, a dashboard.',
  },
  {
    kind: 'libra',
    name: 'Authenticate',
    caption: 'API key Libra issued, or a JWT from your identity provider. The credential stops here.',
    refuse: '401 with no usable credential',
  },
  {
    kind: 'libra',
    name: 'Decide',
    caption: 'The request is matched against the TOML policy set.',
    refuse: '403 when no policy allows it',
  },
  {
    kind: 'libra',
    name: 'Narrow',
    caption: 'The request is rewritten to the entity types, attributes, scopes and time window the policy allows.',
  },
  {
    kind: 'broker',
    name: 'Context broker',
    caption: 'Plain NGSI-LD, unchanged. Told who asked through X-Auth-* headers; it never sees the credential.',
  },
  {
    kind: 'libra',
    name: 'Filter',
    caption: 'The response is filtered on the way back, whether or not the broker honoured the narrowing.',
  },
  {
    kind: 'caller',
    name: 'Caller',
    caption: 'Sees only what the policy allows.',
  },
];

export default function RequestFlow(): ReactNode {
  return (
    <ol className={styles.flow}>
      {steps.map((step) => (
        <li
          key={`${step.name}-${step.caption}`}
          className={`${styles.step} ${styles[step.kind]}`}>
          <div className={styles.node}>
            <div className={styles.head}>
              <span className={styles.name}>{step.name}</span>
              {step.kind === 'libra' && (
                <span className={styles.tag}>Libra</span>
              )}
            </div>
            <span className={styles.caption}>{step.caption}</span>
            {step.refuse && (
              <span className={styles.refuse}>{step.refuse}</span>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
