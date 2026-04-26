# Privacy Policy — Video Speed Control

**Extension:** Video Speed Control - TheY2T
**Last updated:** 2026-04-26

## Overview

Video Speed Control is a browser extension that lets you control the playback speed of any video on any webpage. This policy describes what data the extension accesses and how it is handled.

## Data Collection

**This extension does not collect, transmit, or share any personal data.**

No information about you, your browsing activity, or the pages you visit is ever sent to any server or third party.

## Data Stored Locally

The extension stores two values in your browser's local storage (`chrome.storage.local`) to preserve your preferences between sessions:

| Value | Purpose |
|---|---|
| `lastSpeed` | Your most recently selected playback speed |
| `lastVideoIndex` | Which video was selected if a page has multiple videos |

This data:
- Never leaves your device
- Is not tied to any account or identity
- Can be cleared at any time by removing the extension or clearing browser storage

## Permissions Used

| Permission | Why it is needed |
|---|---|
| `storage` | Saves your last playback speed and selected video so the popup restores your preferences next time |
| `activeTab` | Identifies the currently focused tab so the popup can communicate with the content script running on that tab |
| `host_permissions: <all_urls>` | Videos can be embedded on any website; the extension must be able to run on any domain to detect and control `<video>` elements wherever they appear |

## Content Script Behavior

A content script is injected into every webpage you visit. It:
- Listens for messages from the extension popup
- Reads the list of `<video>` elements on the current page (dimensions, play state, current speed)
- Sets the `playbackRate` property on a video when you change the speed

The content script reads only video element metadata directly from the page DOM. It does not read page content, form data, cookies, or any other information.

## Remote Code

This extension does not load or execute any remote code. All logic is bundled locally within the extension package. There are no external API calls, analytics libraries, or tracking scripts.

## Third Parties

This extension has no third-party integrations. No data is shared with or accessible by any third party.

## Changes to This Policy

If this policy is updated, the updated version will be published alongside the extension. The "Last updated" date at the top of this document will reflect when changes were made.

## Contact

For questions or concerns about this privacy policy, please open an issue at the extension's repository or contact the developer directly.
