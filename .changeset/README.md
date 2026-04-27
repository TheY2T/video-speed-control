# Changesets

This folder is managed by [@changesets/cli](https://github.com/changesets/changesets).

## Adding a changeset

Run `pnpm changeset` and follow the prompts to describe your change (patch / minor / major) and write a summary. This creates a `.md` file here that gets consumed on the next release.

## Releasing

When ready to ship, trigger the **Release** workflow from GitHub Actions. It will:

1. Run `changeset version` to apply all pending changesets, bump `package.json` + `manifest.json`, and generate `CHANGELOG.md`
2. Build the extension
3. Commit, tag, and publish a GitHub release with the zipped `dist/`
