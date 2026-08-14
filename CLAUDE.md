# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` is a symlink to this file, so the same guidance applies to any AI coding agent
working here. Edit `CLAUDE.md`; never replace the symlink with a copy.

## Rule number one: review the real diff before every commit message

**This repository is public.** Anything committed here is published to the world and stays in the
git history even if a later commit removes it.

Never suggest a commit message from memory of what you changed. The user edits files manually,
other tools touch the tree, and a build can leave artifacts behind. Before proposing any commit
message, look at what is *actually* there:

```bash
git status --short          # includes untracked files, which diffs do not show
git diff HEAD               # staged + unstaged changes to tracked files
```

Then read every untracked file that would be committed — `git diff` never shows them.

Review that output as a reviewer, not as the author, and confirm two things:

1. **The change is correct** and does what the ticket asked. Changes that `./test-before-commit.sh`
   cannot verify (docs, config, CI, tooling) must still be read line by line before committing.
2. **Nothing is in the diff that does not belong in a public repository.** Credentials, tokens, API
   keys, `.env` files, private keys, personal or third-party data, absolute local paths, scratch and
   temp files, editor/OS junk (`.idea/`, `.DS_Store`), build output (`_site/`, `.jekyll-cache/`),
   `playwright/node_modules`, `playwright/test-results`, `playwright/playwright-report`, the stray
   `private/` directory, and anything else unrelated to the ticket.

If anything looks wrong or out of place, stop and raise it with the user. Do not commit it and
sort it out afterwards — a public push cannot be taken back.

## What this is

Jekyll 4.4 static site for https://aistomin.com (personal site: home, about, blog, certificates), deployed to GitHub Pages via GitHub Actions. Every page is covered by Playwright e2e tests that assert on concrete DOM content — changing markup or copy usually means updating a spec.

## Commands

```bash
./start.sh                # rebuild image + run dev server with livereload in Docker at http://localhost:4000 (-d for background)
./stop.sh                 # docker compose down
./run-e2e-tests.sh        # run Playwright against an already-running server
./test-before-commit.sh   # full cycle: start -d, wait for :4000, run e2e, stop. Run this before committing.
./cleanup_branches.sh     # delete local branches whose remote is gone
```

`start.sh` wipes `_site`, `.jekyll-cache`, `.jekyll-metadata` and rebuilds the image
(`docker compose up --build`, layer-cached so it costs about a second when nothing changed), so
there is no stale-cache class of bug — if the site looks wrong, it is the source.

The image comes from the checked-in `Dockerfile`: `ruby:3.2-slim-bookworm`, deliberately the same
Ruby minor as `ruby-version` in `.github/workflows/ci-cd.yml`, so the site previewed locally is
built by the same toolchain as production. Move the two together when Ruby is bumped — Dependabot's
`docker` ecosystem is what will tell you it is time.

Gems are installed into the image at build time (into `/usr/local/bundle`, outside the bind mount),
so a `Gemfile` change needs a rebuild — which `start.sh` does anyway. `BUNDLE_FROZEN=true` in the
image stops the container from silently rewriting the committed `Gemfile.lock`; a `Gemfile` edit
without a matching lock update fails the build instead. Update gems deliberately:

```bash
docker compose run --rm -e BUNDLE_FROZEN=false jekyll bundle update
```

Jekyll serves with `--livereload --force_polling` (port 35729), so a saved edit refreshes the
browser by itself. Polling is required because file-change events do not cross the macOS bind mount
reliably. Livereload injects a `livereload.js` script tag into every served page, so the local DOM
differs from production by that one tag — CI runs the same specs against a livereload-free
production build, which is where fidelity is guaranteed.

Everything above except `cleanup_branches.sh` needs the Docker daemon up — check it with
`docker info` before you rely on it, and ask the user to start Docker Desktop if it is down.

Non-Docker alternative: `bundle install && bundle exec jekyll serve`.

Playwright commands (from `playwright/`):

```bash
npm test                                    # all tests, chromium, headless
npx playwright test tests/blog.spec.js      # single file
npx playwright test -g "should display the correct title"   # single test by name
npm run test:ui / test:headed / test:debug
npx playwright show-report
BASE_URL=https://aistomin.com npm test      # run the same suite against production
```

Tests default to `baseURL=http://0.0.0.0:4000` and will not start the server themselves (`webServer` is commented out in `playwright.config.js`) — the server must already be up.

## Layout

- Top-level `.markdown`/`.html` files are pages; `_posts/` holds blog posts with the standard `YYYY-MM-DD-slug.markdown` name, producing URLs like `/2025/12/07/goethe-c1-whats-next.html`.
- `_layouts/default.html` — the only real layout: `<head>` SEO/OG/Twitter meta derived from front matter, the nav menu (Home / About / Blog / Certificates, hardcoded here), footer, and the Google Analytics snippet gated on `jekyll.environment == "production"`.
- `_layouts/post.html` wraps `default` and adds the post date (injected into `.page-header` by inline JS on `DOMContentLoaded`), the `follow-links.html` social block, and Disqus comments when the post's front matter sets `comments: true`.
- `assets/css/main.css` is plain hand-written CSS and the single stylesheet. `_sass/` exists but is empty — do not assume a Sass pipeline.
- `blog.markdown` renders the post index by iterating `site.posts`; new posts appear there automatically.
- `_config.yml` sets `future: true` (future-dated posts build) and excludes `playwright/`, `*.sh`, the Ruby/Docker files, and `CLAUDE.md`/`AGENTS.md` from the build. Anything at the repo root without YAML front matter that is *not* in that `exclude` list gets copied verbatim into `_site` and published on the live site — add new tooling/docs files to the list.
- Ignore `_site/`, `.jekyll-cache/`, and `private/` — build output and stray temp dirs, not source.

### Page front matter conventions

Pages and posts carry `title`, `description`, and usually `image` (an OG image under `/assets/images/`); posts add `excerpt` and `keywords`. `default.html` falls back `page.excerpt → page.description → site.description`, so a missing `description` silently degrades SEO meta rather than failing the build.

Body content is written as raw HTML inside the markdown files (`<div class="page-header">`, `<div class="page-content">`, …) rather than markdown prose — match the surrounding style when editing.

## Tests

`playwright/tests/` has one spec per page, plus `navigation.spec.js`, `robots.spec.js`, and `sitemap.spec.js`. Specs assert exact titles, dates, image `src`/`alt`, and CSS class names, so:

- Adding a blog post means adding a matching `<slug>.spec.js` and, if it should show up in nav/blog assertions, updating those specs.
- Renaming a CSS class or changing display copy will break specs that locate by class or text.
- `sitemap.spec.js` and `robots.spec.js` check the generated `sitemap.xml` (jekyll-sitemap) and `robots.txt`; pages opting out need `sitemap: false` (see `coming-soon.markdown`).

## CI/CD

- `.github/workflows/ci-cd.yml` — on push/PR to `master`: build with `JEKYLL_ENV=production` (Ruby 3.2, Node 22), serve, run the e2e suite, upload the report. Deploy to GitHub Pages runs only on `master` and only if tests pass.
- `.github/workflows/production-e2e-tests.yml` — daily cron (and manual dispatch) running the same suite against `BASE_URL=https://aistomin.com`.
- Dependabot keeps `@playwright/test`, gems, and actions bumped; those PRs land as merge commits.

## Git conventions

Work on a branch named `Issue-<number>` off `master`; commit messages reference the issue, e.g. `ci(#209): bump node from 18 to 22 for playwright 1.62 compatibility`. Run `./test-before-commit.sh` and only commit when it passes.

## Working agreements

These are binding rules for how work happens in this repository, not suggestions.

### Creating a GitHub issue

Repository: https://github.com/aistomin/aistomin.com. Reference issue: [#211](https://github.com/aistomin/aistomin.com/issues/211).

Every issue must have all three of:

1. **A how-to-contribute link at the end of the body**, verbatim:

   ```markdown
   Please read [how to contribute](https://github.com/aistomin/aistomin.com?tab=readme-ov-file#how-to-contribute)
   ```

2. **Assignee `aistomin`.**
3. **The latest active *numbered* milestone.** `Backlog` is an open milestone but is never the answer — pick the highest-numbered open milestone whose title is not `Backlog` (as of milestone 4 that is `Version 1.2`). Resolve it at creation time rather than hardcoding:

   ```bash
   gh api repos/aistomin/aistomin.com/milestones \
     --jq '[.[] | select(.state=="open" and .title!="Backlog")] | sort_by(.number) | last | .title'
   ```

Put the issue in `Backlog` only when the user explicitly says so.

Body shape: a short problem statement, then the proposal or acceptance criteria when the issue is more than one line — richer issues here use `## Problem` / `## Proposal` headings (see #207, #209) — and always the contribute link last.

Show the user the drafted title and body and get approval before calling `gh issue create`.

```bash
gh issue create --title "<title>" --body "<body>" --assignee aistomin --milestone "<resolved milestone>"
```

Afterwards, verify the issue actually carries the assignee and milestone (`gh issue view <n> --json assignees,milestone`) — a bad `--milestone` string fails silently in some `gh` versions.

### Solving a ticket

The user gives a ticket number or a ticket link. Work through these steps in order.

Steps 1–4 are local, reversible, and need no approval — just do them. **Steps 5–8 each stop and
wait for the user to explicitly say go.** "Go" for one step is not go for the next: approving the
implementation is not approval to commit, approving the commit is not approval to push.

1. **Read the ticket.** Always resolve the number against this repository, whatever form the user
   gave it in — a bare number, `#211`, or a full URL:

   ```bash
   gh issue view <number> --json number,title,body,milestone,assignees,labels,state,comments
   ```

2. **Sync master and clean up stale branches.** Merged branches from previous tickets are pruned
   here rather than after a merge — there is no need to tidy the local clone at the end of a ticket.

   ```bash
   git checkout master && git pull && ./cleanup_branches.sh
   ```

3. **Branch.**

   ```bash
   git checkout -b Issue-<number>
   ```

4. **Grill the user on the ticket.** Issues here range from one-line CSS fixes to genuinely
   ambiguous work. Ask about anything the ticket leaves open — scope, acceptance criteria, which
   pages are affected, what the e2e tests should assert. Use the `grill-me` skill when the issue is
   non-trivial or underspecified; for something obviously trivial, one or two clarifying questions
   (or none) are enough. Do not skip straight to code because the fix looks obvious.

5. **Propose the changes — do not make them yet.** Describe what will change, in which files, and
   which Playwright specs need to follow. Edit files only after an explicit go.

   Check the Docker daemon as part of the proposal, not later:

   ```bash
   docker info --format '{{.ServerVersion}}'
   ```

   `./test-before-commit.sh` runs the site in Docker, so it fails outright when the daemon is down.
   Only the user can start Docker Desktop — you cannot. Finding that out *after* the implementation
   is finished wastes a round trip, so say it up front, in the same message as the proposal: either
   "Docker is running, tests will work" or "Docker is not running — please start Docker Desktop
   before you approve this". Never wait until the tests fail to mention it.

   Once implemented: run `./test-before-commit.sh` and report the real result.

6. **Review the real diff, then suggest the commit message.** Always, immediately after the changes
   are in — the user may reject the implementation instead, which sends you back to step 5. Apply
   rule number one first: `git status --short`, `git diff HEAD`, read any untracked files, and check
   the result for both correctness and anything that must not reach a public repository. Never
   suggest a message describing changes you have not just re-read. Never commit before an explicit
   go. Format:

   ```
   type(#<number>): imperative, lower-case summary, no trailing period

   Optional body explaining *why*, wrapped at ~72 chars.

   Closes #<number>
   ```

   The header carries the ticket number in the conventional-commit scope
   (e.g. `ci(#209): bump node from 18 to 22 for playwright 1.62 compatibility`). The `Closes #<number>`
   footer is what makes GitHub close the ticket automatically once the PR is merged into `master`.
   Never add AI attribution (`Co-Authored-By: Claude`, `Generated with Claude Code`) to commits or
   PR bodies.

7. **Suggest pushing.** After the commit exists, offer `git push -u origin Issue-<number>`. Never
   push before an explicit go.

8. **Suggest the pull request.** Offer the PR title (same conventional format as the commit header)
   and body. Create it only on an explicit go:

   ```bash
   gh pr create --title "type(#<number>): summary" --body "<body>"
   ```

   Repeat `Closes #<number>` in the PR body — that closes the ticket regardless of whether the PR is
   merged, squashed, or rebased, whereas the commit footer alone only survives a merge commit.
