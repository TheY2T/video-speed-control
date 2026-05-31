# Changelog

## 2.1.0

### Minor Changes

- 6a90714: feat(presets): expand speed presets to 12 buttons with labeled rows

  Adds 8 new preset speed values (0.25×, 0.75×, 1.25×, 1.75×, 2.5×, 3×, 4×, 5×) alongside
  the existing 4, bringing the full range to 0.25×–5×. Presets are organized into three
  labeled rows — Slow, Normal, and Fast — for faster visual scanning.

## 2.0.0

### Major Changes

- a5b9675: feat: Speed control slider (0×–5× in 0.1 increments)
  feat: Preset buttons: 0.5×, 1×, 1.5×, 2×
  feat: Multi-video support with in-popup video picker showing dimensions and play state
  feat: Per-session persistence of last speed and selected video via `chrome.storage.local`
  feat: Dark theme popup UI (280 px wide)
  feat: Support for Chrome 88+, Edge 88+, Brave, Opera 74+, Arc

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-04-26

### Added

- Speed control slider (0×–5× in 0.1 increments)
- Preset buttons: 0.5×, 1×, 1.5×, 2×
- Multi-video support with in-popup video picker showing dimensions and play state
- Per-session persistence of last speed and selected video via `chrome.storage.local`
- Dark theme popup UI (280 px wide)
- Support for Chrome 88+, Edge 88+, Brave, Opera 74+, Arc
