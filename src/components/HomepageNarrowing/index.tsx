import type { ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

// Every token here is real Libra behaviour: an entity type grant narrows
// ?type=Vehicle,Building to type=Vehicle before the broker is reached, and
// the caller credential stops at Libra, which reports who asked through
// X-Auth-* headers instead. The highlighted lines are the ones that differ
// between what arrives and what leaves.
const policy = `[[policy]]
id = "fleet-read"
description = "The fleet group may read vehicles"
priority = 100

[policy.condition]
groups = ["fleet"]
operations = ["read"]

[policy.access]
effect = "allow"

[policy.access.entity-type]
allowed = ["Vehicle"]`;

const caller = `GET /ngsi-ld/v1/entities?type=Vehicle,Building HTTP/1.1
Authorization: Bearer libra_9f3e…
NGSILD-Tenant: fleet`;

const broker = `GET /ngsi-ld/v1/entities?type=Vehicle HTTP/1.1
X-Auth-Subject: ingest
X-Auth-Groups: fleet
NGSILD-Tenant: fleet`;

const changes = `- Building
- Authorization
+ X-Auth-Subject
+ X-Auth-Groups`;

type PaneProps = {
  label: string;
  file: string;
  language: string;
  highlight: string;
  tone: string;
  children: string;
};

function Pane({ label, file, language, highlight, tone, children }: PaneProps) {
  return (
    <div className={`${styles.pane} ${tone}`}>
      <div className={styles.paneLabel}>
        {label}
        <span className={styles.paneFile}>{file}</span>
      </div>
      <CodeBlock language={language} metastring={highlight}>
        {children}
      </CodeBlock>
    </div>
  );
}

function Arrow({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.arrow} ${className}`} aria-hidden="true">
      →
    </div>
  );
}

export default function HomepageNarrowing(): ReactNode {
  return (
    <section className={styles.narrowing}>
      <div className={styles.inner}>
        <div className={styles.row}>
          <Pane
            label="The caller sends"
            file="to Libra"
            language="http"
            highlight="{1,2}"
            tone={styles.callerTone}>
            {caller}
          </Pane>
          <Arrow />
          <Pane
            label="Libra"
            file="changes"
            language="diff"
            highlight=""
            tone="">
            {changes}
          </Pane>
          <Arrow className={styles.arrowOut} />
          <Pane
            label="The broker receives"
            file="from Libra"
            language="http"
            highlight="{1-3}"
            tone={styles.brokerTone}>
            {broker}
          </Pane>
          <div className={styles.policy}>
            <Pane
              label="The policy"
              file="libra.toml"
              language="toml"
              highlight=""
              tone="">
              {policy}
            </Pane>
          </div>
        </div>

        <p className={styles.caption}>
          The grant covers <code>Vehicle</code>, so the selection that leaves
          Libra names only <code>Vehicle</code>. The token stops at Libra; the
          broker is told who asked through <code>X-Auth-*</code> headers
          instead.
        </p>
      </div>
    </section>
  );
}
