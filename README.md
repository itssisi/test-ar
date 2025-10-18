
# Vercel-ready AR.js Map (NFT)

Deploy this repo to Vercel as a **static site**. The app lives in `/public` so Vercel will serve `public/index.html` automatically.

## IMPORTANT: NFT files
Generate from `/public/assets/asia-map.png` using the AR.js NFT marker tool and put **all three** files in `/public/assets/`:
- asia-map.fset
- asia-map.fset3
- asia-map.iset

## Permissions
The project sets a `Permissions-Policy: camera=*` header (via `vercel.json`) and includes a "Start AR" button to satisfy iOS user-gesture requirements.

## Paths
All asset URLs are absolute (e.g., `/assets/asia-map.png`) to avoid base-path issues on Vercel.

