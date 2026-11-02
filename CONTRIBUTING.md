# Contributions

Libra is not accepting external contributions at the moment, and that includes this repository. Pull requests will be closed without merging, regardless of their quality. This policy is about the project structure, not the change or the person who submitted it.

## Why not

The same source ships in two editions: the [FOSS edition](https://github.com/vela-tools/libra) under the EUPL-1.2 and a proprietary Pro edition built on top of it. SenLab d.o.o. can do that because it holds the copyright on all of the code, and the same has to hold for the prose that documents it. Until a contributor licence agreement exists and its wording is settled, contributions remain closed.

There is a second reason particular to this repository. A page documents what the proxy does, and a version of the documentation documents one version of the proxy. A page that needs changing usually means the proxy changed, or that it behaves differently from how it was described, and that decision belongs where the proxy is. A pull request against the prose alone cannot settle which of the two is wrong.

## What is welcome

Reports, all of them. Open an [issue](../../issues/new/choose).

**A page that is wrong.** If a page describes behaviour the proxy does not have, say which page, what it claims, and what the proxy did instead. Include the version you ran.

**A broken link.** Links between the pages and out into the specification are checked at build time but not against the live internet. A link that goes nowhere is a defect.

**A missing topic.** If you had to work something out from the source or by experiment, the documentation failed. Describe what you were trying to do rather than the page you would write.

**Anything unclear.** A page that skips a step, explains a step wrongly, or assumes knowledge it never introduced is worth reporting even when nothing in it is factually false.

Bugs in Libra itself belong in the [main repository](https://github.com/vela-tools/libra/issues).

## Security

Never report a security vulnerability through a public issue. Follow the [Libra security policy](https://github.com/vela-tools/libra/security/policy), which takes reports privately through GitHub private vulnerability reporting and acknowledges them within two working days.
