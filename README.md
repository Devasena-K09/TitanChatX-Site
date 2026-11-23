# TitanChatX Website

Official website for **TitanChatX**: Chat. Play. Dominate.

Live site: https://titanchatx.questtitan.in

## What is in this repo
| File | Purpose |
|---|---|
| `index.html` | Home page: hero, product tour, features, privacy, plans, FAQ, download |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Use |
| `delete-account.html` | How to delete your account and data |
| `style.css` / `app.js` | Styles and interactions |
| `sitemap.xml`, `robots.txt` | Search engine files |
| `og-image.png` | Preview image shown when the link is shared |

## Download link
The Android app is hosted on GitHub Releases:
https://github.com/Devasena-K09/TitanChatX-Releases/releases/latest/download/TitanChatX.apk

The download link and version number are set in one place, the `INSTALL` block at the top of `app.js`.

## Updating the site for a new app version
1. Upload the new `TitanChatX.apk` to a new release in the TitanChatX-Releases repo (same file name).
2. Change `version` in the `INSTALL` block in `app.js`.
3. Commit the change. Cloudflare Pages redeploys automatically.

## Hosting
Static site, no build step. Hosted on Cloudflare Pages (build command: none, output directory: `/`).

## Contact
teamnirux@gmail.com
