# 📅 Year Tracker Wallpaper API

Auto-updating wallpaper generator with REST API for iOS Shortcuts.

## 🚀 API Endpoint

Once deployed, your wallpaper is available at:

```
https://your-app.vercel.app/api/wallpaper
```

### Query Parameters

| Parameter | Default | Options |
|-----------|---------|---------|
| `device` | `iphone13promax` | `iphone15promax`, `iphone15pro`, `iphone14`, `iphonese`, `macbook14`, `macbook16`, `macbookair13` |
| `bg` | `#1a1a1a` | Any hex color |

### Examples

```
/api/wallpaper                          # Default iPhone 13 Pro Max
/api/wallpaper?device=macbook14         # MacBook Pro 14"
/api/wallpaper?device=iphone15pro&bg=#000000  # Black background
```

## 📱 iOS Shortcut Setup

1. **Create Shortcut:**
   - Get Contents of URL → `https://your-app.vercel.app/api/wallpaper`
   - Set Wallpaper → Lock Screen / Home Screen / Both

2. **Create Automation:**
   - Time of Day → 12:00 AM daily
   - Run your shortcut
   - Turn OFF "Ask Before Running"

## 🛠️ Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Local Development

```bash
npm install
vercel dev
# Visit http://localhost:3000/api/wallpaper
```
