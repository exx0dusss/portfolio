# ExdDownloadApp — version history (draft)

Source material for the case study's History section. Found by scanning the
repositories on 2026-10-29; dates are commit dates, so "released" means
"the code existed", not a confirmed launch. Tymur fills in launches, problems
and numbers.

| Version    | Dates (commits)        | Repository · branch                                  | Stack                                                                                                         |
| ---------- | ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| v1         | by Sep 2023 → Mar 2024 | `exx0dusss/tiktok-download-save-bot` · `v1`          | Node, `node-telegram-bot-api`, single `bot.js`, Postgres (`pg`)                                               |
| v2         | Feb 2024 → Aug 2024    | `exx0dusss/tiktok-download-save-bot` · `master`      | Telegraf + Sequelize at first, then grammY + plugins, Redis, local Bot API server; ported to Deno in Aug 2024 |
| v3         | Nov 2024 → Feb 2025    | `ExdBots/exd-tiktok-bot` · `release/v3`              | NestJS + Prisma, grammY, Redis; Supabase Postgres                                                             |
| (monorepo) | Jan 2025 → Apr 2025    | `ExdBots/exd-tiktok-bot` · second history root       | Turborepo with `apps/bot` and `apps/api` (NestJS 11)                                                          |
| v4         | Apr 2025 → now         | `ExdBots/exd-tiktok-bot` · `main` (`release/v4.0.0`) | Deno, grammY, Hono + tRPC, Drizzle, Postgres                                                                  |

## v1 — the single-file bot

- Earliest trace: `anonymous-chat-bot` (2023-09-18) has commented-out code
  that builds `t.me/TikTokDownloaderExdBot?start=…` links, so the bot was
  live under that username by September 2023.
- The code itself was uploaded to the `v1` branch on 2024-03-08 ("V1
  Uploaded"): one `bot.js` on `node-telegram-bot-api` with polling, a scraper
  in `Client/Client.js`, Postgres through raw `pg`, admins and UI icons in
  `config.json`, and `cleaner.sh` / `restarter.sh` scripts beside it.
- Its IDE project is named `tiktok-downloader-bot-v2`. Was there an even
  earlier version? To confirm.

## v2 — `tiktok-download-save-bot`

Repo created 2024-02-13 ("A telegram bot that downloads tiktoks and more").

| Date               | Commit                | Change                                                                                                                                                             |
| ------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2024-02-15         | `a109000`             | "architecture ini": Telegraf, Sequelize (Postgres / SQLite), `@tobyg74/tiktok-api-dl`                                                                              |
| 2024-02-22         | `3e157d4`             | audio download                                                                                                                                                     |
| 2024-02-25         | `216532b`             | Redis                                                                                                                                                              |
| 2024-03-02         | `6300864`             | database connected                                                                                                                                                 |
| 2024-04-04 → 04-16 | `056f467` … `ad1f6f7` | "Stable download", slideshow widget, follow author; on grammY with its plugins (menu, conversations, i18n, Redis sessions); local Bot API server (`tqueue.binlog`) |
| 2024-04-16         | `33eddf5`             | PR #1 dev → master                                                                                                                                                 |
| 2024-04-21 → 07-05 | `1237c2e` … `af6d078` | admin panel (statistics, mailing, mandatory subscription, referrals)                                                                                               |
| 2024-08-05         | `ed3d104`             | rewrite starts; old code moved to `.old/`                                                                                                                          |
| 2024-08-10         | `b002d8e` …           | download and donate commands, page widget, languages                                                                                                               |
| 2024-08-12         | `bcc672d`             | Deno (`deno.lock`, `deno.land/x/grammy@v1.28.0`)                                                                                                                   |

## v3 — NestJS + Prisma

- `exd-tiktok-bot` was created in the ExdBots org on 2024-11-02; first commit
  `4517ae9d` on 2024-11-05.
- NestJS 10, Prisma 5, grammY 1.31, `@tobyg74/tiktok-api-dl`; Redis by
  2024-11-29.
- PR #1 (dev) merged 2024-12-02. Last commit 2025-02-26: Docker deploy on
  Supabase Postgres (`release/v3`, `release/v3.0.0`).

## Monorepo detour

- A separate history begins 2025-01-28 with `create-turbo`: `apps/bot` and
  `apps/api` (NestJS 11) in a Turborepo. Last state 2025-04-09. Abandoned
  for v4? To confirm.

## v4 — Deno

| Date               | Commit                 | Change                                                      |
| ------------------ | ---------------------- | ----------------------------------------------------------- |
| 2025-04-11         | `da442a2d`             | `deno.json`: the rewrite on Deno                            |
| 2025-04-12         | `de176d46`, `d0750d02` | Hono, then Drizzle and tRPC                                 |
| 2025-09-09         | `f59818ba`             | BullMQ queue on Redis (ioredis), TikTok API library back in |
| 2025-10-24 → 11-13 | PRs #10–#23            | `release/admin`, then a run of `fix/pre-production`         |
| 2026-03-02         | `4edc3e34`             | `release/v4.0.0` cut: CI workflow                           |
| 2026-03 → 04       |                        | ExdBots SDK integration (`feat/sdk-integration`)            |
| 2026-10-12         | `aa0fd525`             | Sentry                                                      |
| 2026-10-23         | `d2da6a1e`             | MCP admin server                                            |

## Reasons (from Tymur, 2026-10-29)

- v1 → v2: node-telegram-bot-api was buggy; one file had no room to grow.
- Telegraf → grammY: grammY's plugins (menus, conversations, i18n, sessions).
- v2 → v3 NestJS: v2 had grown messy; NestJS gave it structure for growth.
- Turborepo dropped: an architecture mismatch. Preparing for the web app, the
  bot and API were split on the belief they had to be; they didn't.
- v3 → v4 Deno: NestJS's dependency injection and MVC patterns don't fit a
  bot's functional nature.
- Sep 2025 queue: inferred, not confirmed: downloads in the bot process held
  up its replies.

## Still to confirm with Tymur

- Launch date of v1, and whether anything came before it.
- Which versions actually ran in production, and when each replaced the last.
- Did the Aug 2024 Deno port of v2 ship, or did v3 (NestJS) replace v2 directly?
- The bot's username: the 2023 code links to `@TikTokDownloaderExdBot`.
- The problems each change solved (rate limits, Telegram's 50 MB cap and the
  local Bot API server, queueing, and so on).
