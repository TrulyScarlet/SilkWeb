# SilkWeb

The official web portal and download center for **Silk Studio**, created by **Scarlet** ([@TrulyScarlet](https://github.com/TrulyScarlet)).

- **Silk Studio App Repository:** [TrulyScarlet/silk-studio](https://github.com/TrulyScarlet/silk-studio)
- **SilkWeb Repository:** [TrulyScarlet/SilkWeb](https://github.com/TrulyScarlet/SilkWeb)

## Features
- **Interactive UI Simulator:** Test Silk Studio's desktop interface, native in-game HUD overlay, theme switcher, and hotkey recording trigger directly in the browser.
- **Direct Installer & Portable Downloads:** Bundled latest NSIS setup (`Silk-Setup-Latest.exe`) and standalone binary (`Silk-Portable-Latest.exe`) with dynamic fallback to GitHub Releases API.
- **Architecture Explainer:** Visualizer for the circular bounded RAM buffer and discrete multi-track WASAPI audio capture.
- **Comparison Matrix:** Silk Studio vs NVIDIA ShadowPlay vs OBS Studio vs Medal vs SteelSeries GG.
- **Author Attribution:** Showcasing Scarlet's vision for private, zero-bloat, 100% open-source gaming clipping.

## Development

```bash
# Install dependencies
npm install

# Run local dev server with HMR
npm run dev

# Build production bundle
npm run build

# Run 24/7 standalone production server
node server.js
```

## License
MIT License • Created by Scarlet
