# TitanChatX — Official Website

**Chat. Play. Dominate.**

Official website and public web presence of **TitanChatX**, a communication and social entertainment platform designed to bring people closer through messaging, shared experiences, interactive spaces and community features.

🌐 **Live Website:** https://titanchatx.questtitan.in  
📱 **Android Downloads:** [TitanChatX Releases](https://github.com/Devasena-K09/TitanChatX-Releases)  
📦 **Latest APK:** [Download TitanChatX](https://github.com/Devasena-K09/TitanChatX-Releases/releases/latest/download/TitanChatX.apk)

---

## 1. About the Project

TitanChatX is built around a simple idea: communication should be more than exchanging messages.

The platform brings together conversations, communities, entertainment and interactive experiences in one connected environment.

This repository contains the official TitanChatX website, including product information, downloads, legal pages and website functionality.

## 2. Website Features

| File | Purpose |
|---|---|
| `index.html` | Homepage, hero section, product tour, features, privacy, plans, FAQ and download |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Use |
| `delete-account.html` | Account and data deletion instructions |
| `style.css` | Website styling |
| `app.js` | Website interactions and installation configuration |
| `sitemap.xml` | Search engine sitemap |
| `robots.txt` | Search engine crawling instructions |
| `og-image.png` | Social sharing preview image |

## 3. Technology and Infrastructure

- **Frontend:** HTML, CSS and JavaScript
- **Hosting and deployment:** Cloudflare Pages
- **Source control:** Git and GitHub
- **Application distribution:** GitHub Releases

The website is a static website and currently does not require a separate build command.

## 4. Android Application Distribution

The Android application is maintained separately from this website repository.

**Dedicated Releases Repository:**  
https://github.com/Devasena-K09/TitanChatX-Releases

**Latest APK Download:**  
https://github.com/Devasena-K09/TitanChatX-Releases/releases/latest/download/TitanChatX.apk

The application download URL and displayed version number are configured in the `INSTALL` block at the top of `app.js`.

## 5. Updating the Website for a New App Version

1. Upload the updated `TitanChatX.apk` to a new release in the TitanChatX-Releases repository.
2. Keep the APK asset filename consistent.
3. Update the application version in the `INSTALL` block inside `app.js`.
4. Commit and push the website changes to the `main` branch.
5. GitHub Actions and Cloudflare Pages handle the configured checks and deployment.

## 6. Deployment and Hosting

TitanChatX Website is hosted on **Cloudflare Pages**.

- Hosting type: Static website
- Build command: None
- Output directory: `/`
- Source repository: `Devasena-K09/TitanChatX-Site`
- Production domain: https://titanchatx.questtitan.in

Deployment is automatically triggered by repository updates according to the configured Cloudflare Pages integration.

## 7. Repository Structure

```text
TitanChatX-Site/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── index.html
├── app.js
├── style.css
├── privacy.html
├── terms.html
├── cookies.html
├── delete-account.html
├── confirm_signup.html
├── reset.html
├── reset_password.html
├── og-image.png
├── robots.txt
├── sitemap.xml
└── README.md
```

*The structure above describes the principal website files and may evolve as the project develops.*

## 8. Project Ownership

**Project:** TitanChatX  
**Ownership:** Individual Founder  
**Founder:** Devasena K.  
**GitHub:** https://github.com/Devasena-K09  
**Contact:** teamnirux@gmail.com

## 9. Contact

For project-related enquiries, technical questions or collaboration discussions:

**Email:** teamnirux@gmail.com

---

*TitanChatX — Chat. Play. Dominate.*
