# My Money

An offline Android app for keeping track of personal savings and spending decisions.

## Features

- **Home dashboard** – savings balance, monthly target, spending limit and a 6-month net-saved chart
- **My buys** – a wishlist paid from your own savings, with priorities and "can afford now" status
- **Ask parents** – items to request, with status tracking and a ready-to-send pitch
- **Savings** – goals with target dates, plus a full transaction history
- **Smart calculator** – type an amount and get a verdict (*Go for it / Think twice / Skip it*) based on your savings, monthly limit, wishlist, goals and your chosen money mindset
- Light and dark themes, backup and restore, works fully offline

All data stays on the device. There are no accounts and no network calls.

## Download

Download **[My-Money.apk](download/My-Money.apk)** (tap *View raw* / the download button) and open it on an Android phone running Android 7 or newer. Allow "Install unknown apps" when asked.

The APK is a signed release build that asks for no permissions at all.

## Built with

HTML, CSS and JavaScript, packaged for Android with [Capacitor](https://capacitorjs.com). Each push to `main` builds the release APK with GitHub Actions; it is then signed with the app's release key.

```
download/                signed APK
www/                     the app
icons/                   launcher icons
.github/workflows/       APK build
```
