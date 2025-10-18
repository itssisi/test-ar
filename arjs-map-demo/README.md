
# AR.js Map Stats (NFT)

This project uses **AR.js (NFT image tracking)** with **A-Frame** to overlay stats on your Asia map when viewed through a mobile browser.

## What you need to add (one-time)
Generate NFT marker files from `assets/asia-map.png`:
- `asia-map.fset`
- `asia-map.fset3`
- `asia-map.iset`

Put all three into `assets/` (same folder as the PNG).  
Use the AR.js NFT marker generator (GUI or CLI). Search for "AR.js NFT marker generator" for instructions.

## Run locally
Any static server works:
- Python: `python -m http.server 5500`
- Node: `npx serve`

Open on your phone (same network), allow camera, and point at the map (print/screen).

## Customize overlays
Edit `data/asia-stats.json`. Each item has normalized coordinates (X in [-0.6, 0.6], Y in [-0.4, 0.4]) mapped onto a reference plane (width=1.2, height=0.8) aligned to the NFT. Tweak `x`/`y` to reposition labels. Values are free-form (GDP, population, your metrics, etc.).

## Notes
- HTTPS is required when deploying (GitHub Pages / Vercel).
- Good lighting and a flat, high-contrast print/screen improve tracking.
- You can replace text with charts by drawing to a canvas and using as a texture.

