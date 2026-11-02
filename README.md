<p align="center">
  <img src="static/img/vela.png" alt="" width="88" height="88">
</p>

<h1 align="center">Libra Documentation</h1>

<p align="center">
  <strong>The guides and reference for <a href="https://github.com/vela-tools/libra">Libra</a>, the authentication and authorization proxy that sits in front of an <a href="https://ngsi-ld.org/">NGSI-LD</a> context broker.</strong>
</p>

<p align="center">
  <a href="https://vela-tools.github.io/libra/">Read the documentation</a> ·
  <a href="#run-it-locally">Run it locally</a> ·
  <a href="#how-the-docs-are-versioned">Versioning</a> ·
  <a href="#community">Community</a> ·
  <a href="#license">License</a>
</p>

<p align="center">
  <a href="https://github.com/vela-tools/libra-docs/actions/workflows/build.yaml"><img alt="build" src="https://github.com/vela-tools/libra-docs/actions/workflows/build.yaml/badge.svg"></a>
  <a href="LICENSE.md"><img alt="license: CC-BY-4.0" src="https://img.shields.io/badge/license-CC--BY--4.0-blue"></a>
  <img alt="ngsi-ld v1.9.1" src="https://img.shields.io/badge/NGSI--LD-v1.9.1-orange">
</p>

<p align="center">
  <sub>Part of <a href="https://github.com/vela-tools">Vela Tools</a> · Based on EU open standards 🇪🇺 · Built in Ljubljana, Slovenia 🇸🇮 by SenLab d.o.o.</sub>
</p>

---

## What this is

The source of [vela-tools.github.io/libra](https://vela-tools.github.io/libra/), a [Docusaurus](https://docusaurus.io/) site holding the documentation pages for Libra.

The pages cover writing policies, configuring, running, deploying and testing Libra, and the security properties it holds and does not. Libra implements NGSI-LD v1.9.1 (ETSI GS CIM 009 v1.9.1), not the API of any one broker. Scorpio is the broker it is tested against at the moment.

## Run it locally

```bash
npm install
npm run start
```

That serves the site with live reload. To reproduce what CI does:

```bash
npm run typecheck                              # the config and the theme components
npm run build                                  # fails on a broken internal link
npm run serve                                  # serve the built output
```

`onBrokenLinks` is set to `throw`, so a link into a page that does not exist stops the build rather than warning. Links out to the specification and to GitHub are absolute and are not checked here.

## How the docs are versioned

The site is versioned only. There is no current `docs/` directory, and `includeCurrentVersion` is off, so an edit goes straight into `versioned_docs/version-<v>` and its sidebar lives in `versioned_sidebars/version-<v>-sidebars.json`. The newest entry in `versions.json` is the default and is served at `/docs`, without a version in the path.

To cut a release, copy the newest version directory and its sidebar, add the version to `versions.json`, and name it in the `versions` map in `docusaurus.config.ts`. `docusaurus docs:version` needs a current version and will not work here.

```
versioned_docs/version-1.0.0-beta.1/
```

The pages for a version document that version of the proxy and nothing else.

`docusaurus-plugin-llms` points at the newest version and writes `llms.txt`, `llms-full.txt`, and a markdown copy of every page into the build output.

## Contributing

Libra is not accepting external contributions right now, this repository included. Reports are another matter, and all of them are welcome: a page that describes behaviour the proxy does not have, a link that goes nowhere, a topic with no page, a step explained wrongly. [CONTRIBUTING.md](CONTRIBUTING.md) says why the door is shut and what to put in the report.

Never report a security vulnerability through a public issue. Follow the [Libra security policy](https://github.com/vela-tools/libra/security/policy) instead.

## Community

- Issues: [GitHub Issues](../../issues)
- Documentation: [vela-tools.github.io/libra](https://vela-tools.github.io/libra/)
- Libra itself: [vela-tools/libra](https://github.com/vela-tools/libra)
- Newsletter: [velacontext.com/newsletter](https://velacontext.com/newsletter)
- General contact: info@senlab.io
- Security: [private vulnerability reporting](https://github.com/vela-tools/libra/security/advisories/new), see the [security policy](https://github.com/vela-tools/libra/security/policy)

## License

One licence covers this repository: [CC-BY-4.0](LICENSE.md), for the prose and the site source alike. Reuse it anywhere, including commercially, as long as you credit SenLab d.o.o. and say whether you changed it. Libra itself is [EUPL-1.2](https://eupl.eu/1.2/en/), in its own repository. [NOTICE.md](NOTICE.md) has the detail and the trademark terms.

## About

Libra is part of Vela Tools, an open-core infrastructure project for the NGSI-LD ecosystem. SenLab d.o.o. builds it in Ljubljana, Slovenia. Learn more at [velacontext.com](https://velacontext.com).
