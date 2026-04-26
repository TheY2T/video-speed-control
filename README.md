# Video Speed Control — TheY2T

A lightweight Chromium browser extension that lets you control the playback speed of any `<video>` element on any webpage. Features a clean toolbar popup with a 0–5× slider, one-tap preset buttons, per-video selection on pages with multiple videos, and persistent speed memory across sessions.

---

## Features

- **0× – 5× speed range** via a smooth slider (0.1× increments)
- **Quick-tap presets** — 0.5×, 1×, 1.5×, 2×
- **Multi-video support** — lists every `<video>` on the page so you can pick which one to control
- **Persistent state** — remembers your last speed and selected video across page reloads and tabs
- **Works everywhere** — injects into any http/https page with no site-specific configuration

## Browser compatibility

Works in all Chromium-based browsers via Manifest V3:

| Browser | Support |
|---|---|
| Chrome 88+ | ✅ |
| Edge 88+ (Chromium) | ✅ |
| Brave | ✅ |
| Opera 74+ | ✅ |
| Arc | ✅ |

Firefox MV3 support is not in scope for v1 due to minor API differences.

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 9+ (`npm install -g pnpm`)

### Install & build

```bash
git clone https://github.com/TheY2T/video-speed-control.git
cd video-speed-control
pnpm install
pnpm build
```

The compiled extension is written to `dist/`.

> **Icons:** place your `icon-16.png`, `icon-48.png`, and `icon-128.png` files inside the `images/` directory before building.

### Load into your browser

1. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`, etc.)
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked** and select the `dist/` folder
4. The extension icon appears in your browser toolbar

---

## Usage

1. Navigate to any page that contains a `<video>` element (YouTube, Vimeo, streaming sites, etc.)
2. Click the **Video Speed** icon in the toolbar
3. If multiple videos are detected, select the one you want to control from the list
4. Drag the slider or tap a preset button to change playback speed
5. The speed is applied instantly and saved for your next visit

---

## Project structure

```
video-speed-control/
├── src/
│   ├── content.ts          # Injected into every page — handles playbackRate
│   ├── popup.ts            # Toolbar popup — UI logic, messaging, storage
│   └── popup.css           # Popup styles (dark theme)
├── scripts/
│   └── copy-assets.js      # Copies manifest.json + images/ into dist/
├── images/                 # Extension icons (16px, 48px, 128px)
├── manifest.json           # MV3 manifest
├── popup.html              # Popup HTML shell
├── vite.config.ts          # Popup build (ES module, HTML entry)
├── vite.content.config.ts  # Content script build (IIFE format)
├── pnpm-workspace.yaml     # pnpm catalog — pins all dep versions
└── tsconfig.json
```

## Tech stack

| Tool | Role |
|---|---|
| TypeScript 5 | All source files |
| Vite 6 | Bundler — separate configs for popup and content script |
| pnpm 9 + catalogs | Package management with centralised version pins |
| Chrome Extensions MV3 | `chrome.storage`, `chrome.tabs`, `chrome.runtime` APIs |

---

## How it works

The extension has two compiled outputs:

- **`content.js`** (IIFE) — injected into every page at `document_idle`. Listens for three messages from the popup: `GET_VIDEOS`, `SET_SPEED`, and `GET_SPEED`. Responds by reading from or writing to `document.querySelectorAll('video')`.

- **`popup.js`** (ES module) — runs inside the toolbar popup. On open it queries the active tab's content script for the video list, renders the UI, restores the last-used speed from `chrome.storage.local`, and forwards slider/preset changes back to the content script.

No background service worker is needed — the popup communicates directly with the content script via `chrome.tabs.sendMessage`.

---

## Development

```bash
# Watch mode — rebuilds popup on every save (content script requires a separate run)
pnpm dev
```

After any code change, go to `chrome://extensions` and click the **reload** button on the extension card, then refresh the target page.

---

## License

MIT
