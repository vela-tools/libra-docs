import type { ReactNode } from 'react';

import styles from './styles.module.css';

type Kind = 'wrapper' | 'stage' | 'decision' | 'slot' | 'exit';

interface Layer {
  kind: Kind;
  row: number;
  name: string;
  caption: string;
  tag?: string;
  refuse?: string;
}

// The request path as one vertical flow, outermost first. Each node carries
// the row number the page and the management-route table refer to, and the
// reason that layer sits where it sits. Wrappers sit around the stack, the
// decision and the extension point are the positions the order is argued
// from, and the enforcement tag marks the block that narrows under the
// decision. The refusal chips name the only answers a caller can get that are
// not a narrowed or filtered response.
const layers: Layer[] = [
  {
    kind: 'wrapper',
    row: 1,
    name: 'CORS',
    caption:
      'Answers a preflight without waking anything below it.',
  },
  {
    kind: 'wrapper',
    row: 2,
    name: 'Request id, tracing',
    caption:
      'Discards any x-request-id the caller sent and mints one, which the audit record below carries and the response returns, so a caller\'s report finds its audit line.',
  },
  {
    kind: 'wrapper',
    row: 3,
    name: 'Metrics',
    caption:
      'Outermost measurement, so a timing covers every layer below. The probes and the metrics path itself are excluded, so watching Libra does not become the traffic being watched.',
  },
  {
    kind: 'stage',
    row: 4,
    name: 'Audit',
    caption:
      'Outermost of the proxied stack, above everything that can refuse, so a 401, a 403 or a 413 is on the record as well as a success. The layers below tell it who the caller was through the slot it inserts.',
  },
  {
    kind: 'stage',
    row: 5,
    name: 'Error handling',
    caption:
      'Turns any refusal below into an RFC 9457 response, so nothing below has to know how one is rendered.',
  },
  {
    kind: 'stage',
    row: 6,
    name: 'In-flight ceiling',
    caption:
      'Immediately below the error handler, so a refusal over the ceiling renders as a problem response, and above everything that reads a body or waits on the broker, so it bounds the memory and broker pins a request costs. Proxied traffic only, because a shared ceiling would lock the operator out of the management routes during the incident the ceiling exists for.',
    refuse: '503 over the ceiling',
  },
  {
    kind: 'stage',
    row: 7,
    name: 'Upstream timeout',
    caption:
      'Bounds the whole request, so one hung broker cannot pin connections until the proxy stops serving.',
    refuse: '504 when the broker does not answer',
  },
  {
    kind: 'stage',
    row: 8,
    name: 'Payload limit',
    caption:
      'Before any body is read.',
    refuse: '413 over the limit',
  },
  {
    kind: 'stage',
    row: 9,
    name: 'Identity header stripping',
    caption:
      'Before anything can read or write an X-Auth-* header. A forged one must not survive to a point where something believes it. The sweep and the propagation read one shared list of names, so the two directions cannot drift.',
  },
  {
    kind: 'stage',
    row: 10,
    name: 'Method refusal',
    caption:
      'Refuses a method with no NGSI-LD meaning before anything classifies the request by its method.',
    refuse: '400 for a method with no NGSI-LD meaning',
  },
  {
    kind: 'stage',
    row: 11,
    name: 'Security headers',
    caption:
      'Applied to the response on the way back.',
  },
  {
    kind: 'stage',
    row: 12,
    name: 'Tenant resolution',
    caption:
      'Decides which tenant, from NGSILD-Tenant, and whether the request may be anonymous at all. An empty or repeated header is refused rather than resolved.',
  },
  {
    kind: 'stage',
    row: 13,
    name: 'Authentication',
    caption:
      'Hands the credential to the one authenticator that recognizes it, and produces the identity the policy engine sees. The Authorization header is removed here, so the broker never receives an API key or a token.',
    refuse: '401 with no usable credential',
  },
  {
    kind: 'stage',
    row: 14,
    name: 'Operation classification',
    caption:
      'Classifies the method and path into one NGSI-LD operation, once, into request extensions. Below authentication, so a caller with no acceptable credential learns nothing about which paths exist. A method or path no two hops would read alike is refused, so nothing unclassifiable travels further.',
    refuse: '404 outside the NGSI-LD API',
  },
  {
    kind: 'stage',
    row: 15,
    name: 'Query parsing',
    caption:
      'Parses the query string, once, into request extensions. A repeated parameter, one spelled in two cases, or one that does not decode is refused. A layer that narrows the query writes the stored parameters and the request target together, so the next layer reads the query the broker will be sent.',
    refuse: '400 for a query it cannot read one way',
  },
  {
    kind: 'stage',
    row: 16,
    name: 'Context resolution',
    caption:
      'Resolves the request\'s @context, once, into request extensions, from the inline member or the Link header, never both. The two channels are mutually exclusive by content type, and a request that mixes them is refused rather than resolved. Reading the body here is what makes one parse serve authorization and every enforcement layer below.',
  },
  {
    kind: 'stage',
    row: 17,
    name: 'Representation resolution',
    caption:
      'Reads the Accept (every field line, combined into one list as the broker combines them), the options and the format the caller sent, once, into request extensions. Everything below that rewrites or filters a response reads the answer rather than parsing the header again.',
  },
  {
    kind: 'stage',
    row: 18,
    name: 'Linked entity resolution',
    caption:
      'Reads what the request asks for in Linked Entity Retrieval (NGSI-LD 4.5.23), from the query string, a Query body or a subscription, once, into request extensions. Directly above authorization, its first reader: a join touches entities of types the request never names. Every enforcement layer below judges a join answer by the same reading. It refuses only a selector it cannot read.',
  },
  {
    kind: 'decision',
    row: 19,
    name: 'Authorization',
    caption:
      'Evaluates the policy set and produces the decision every layer below reads.',
    tag: 'The decision',
    refuse: '403 when no policy allows it',
  },
  {
    kind: 'slot',
    row: 20,
    name: 'Layers a binary adds',
    caption:
      'Below authorization, so whatever answers from memory, such as a cache, answers a request that has already been authenticated and authorized. Empty in the binary this repository builds.',
    tag: 'Extension point',
  },
  {
    kind: 'stage',
    row: 21,
    name: 'Registration disclosure',
    caption:
      'A registration reader who may not also write registrations is not shown what a registration carries for its source, so no caller reads contextSourceInfo out of the tenant\'s topology.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 22,
    name: 'Aggregation enforcement',
    caption:
      'Narrows an aggregated read to the methods, the period and the window grid the decision allows. The temporal layer below it then narrows the window onto that grid.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 23,
    name: 'Time enforcement',
    caption:
      'Intersects the request\'s temporal window with the restriction\'s, narrows timeAt, endTimeAt and temporalQ, and on a current-state read under values-in-window filters the answer\'s attribute instances.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 24,
    name: 'Attribute enforcement',
    caption:
      'Narrows attrs and the projections of a batch query, and filters the response body, because attrs is a hint a broker may ignore and an omit list cannot be written as a selector at all.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 25,
    name: 'Scope enforcement',
    caption:
      'Narrows scopeQ to what the decision allows, judges an entity addressed by identifier through a pre-flight, filters the scope member down to what is allowed, and holds writes to scope-on-write.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 26,
    name: 'Type enforcement',
    caption:
      'Narrows the type selection to what the decision allows, pre-flights entities the request does not name a type for, refuses a create of a forbidden type, and holds writes to type-on-write.',
    tag: 'Enforcement',
  },
  {
    kind: 'stage',
    row: 27,
    name: 'Identity propagation',
    caption:
      'The only place an X-Auth-* header is written. Every entry is written or removed on every request, so nothing a caller sent survives in one by accident.',
  },
  {
    kind: 'exit',
    row: 28,
    name: 'Proxy',
    caption:
      'To the broker. Hop-by-hop headers are stripped in both directions. NGSILD-Tenant and the X-Auth-* set are protected end to end. On the way back, Server, X-Powered-By and Set-Cookie are removed, and a Location, Content-Location or Link target that points into the broker is rewritten, so the answer never carries the broker\'s address.',
  },
];

export default function LayerFlow(): ReactNode {
  return (
    <ol className={styles.flow}>
      {layers.map((layer) => (
        <li key={layer.row} className={`${styles.step} ${styles[layer.kind]}`}>
          <div className={styles.node}>
            <div className={styles.head}>
              <span>
                <span className={styles.row}>{layer.row}</span>{' '}
                <span className={styles.name}>{layer.name}</span>
              </span>
              {layer.tag && <span className={styles.tag}>{layer.tag}</span>}
            </div>
            <span className={styles.caption}>{layer.caption}</span>
            {layer.refuse && <span className={styles.refuse}>{layer.refuse}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}
