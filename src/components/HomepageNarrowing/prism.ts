import { Prism } from 'prism-react-renderer';

// prismjs grammar components attach their languages to the Prism they find
// on the global object, so the shared instance from prism-react-renderer is
// published first. The grammar imports live in index.tsx and evaluate after
// this module.
(globalThis as unknown as { Prism: unknown }).Prism = Prism;
