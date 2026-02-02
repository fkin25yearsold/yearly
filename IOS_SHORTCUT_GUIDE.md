# 📱 iOS Shortcut Setup Guide

Complete guide for setting up auto-updating wallpaper on iPhone.

---

## 🎯 What You'll Build

A shortcut that:
- ✅ Downloads fresh wallpaper from your API daily
- ✅ Sets both Lock Screen & Home Screen
- ✅ Runs automatically at midnight (Phoenix time)
- ✅ Works silently in the background

---

## Step 1: Create the Shortcut

1. Open **Shortcuts** app on your iPhone
2. Tap **+** (top right) to create new shortcut
3. Tap **Add Action**

---

## Step 2: Add Actions (in order)

### Action 1: Get Contents of URL
- Search for **"Get Contents of URL"**
- Add it
- Enter your API URL:
  ```
  https://yearly-do65.vercel.app/api/wallpaper
  ```
  
### Action 2: Set Wallpaper
- Search for **"Set Wallpaper"**
- Add it
- Tap **"Photo"** and select **"Contents of URL"** (from previous action)
- Tap **"Screen"** → Choose **"Both"** (Lock Screen + Home Screen)
- **IMPORTANT:** Turn OFF "Show Preview"

---

## Step 3: Configure Shortcut

1. Tap the shortcut name at top → **Rename** to "Year Tracker Wallpaper"
2. Tap **ⓘ** (info icon)
3. Enable **"Allow Running When Locked"**
4. Tap **Done**

---

## Step 4: Create Daily Automation

1. Go to **Automation** tab (bottom)
2. Tap **+** → **Personal Automation**
3. Choose **"Time of Day"**
4. Set time to **12:00 AM** (midnight)
5. Select **"Daily"**
6. Tap **Next**

### Add Your Shortcut
7. Tap **"Add Action"**
8. Search for **"Run Shortcut"**
9. Select **"Year Tracker Wallpaper"**
10. Tap **Next**

### Disable Confirmation
11. **Turn OFF** "Ask Before Running"
12. **Turn OFF** "Notify When Run" (optional)
13. Tap **Done**

---

## 🧪 Test Your Shortcut

1. Go back to **Shortcuts** tab
2. Tap your "Year Tracker Wallpaper" shortcut
3. Wait 2-3 seconds
4. Check your Lock Screen - it should have the new wallpaper!

---

## 🔧 Troubleshooting

### Wallpaper not updating?
1. Make sure your Vercel app is deployed and accessible
2. Test the API URL in Safari first
3. Check that "Allow Running When Locked" is enabled

### Automation not running?
1. Go to Settings → Shortcuts → Advanced
2. Enable "Allow Running Scripts"
3. Make sure "Ask Before Running" is OFF

### Black wallpaper?
- The API might have failed - check your Vercel logs
- Try running the shortcut manually

---

## 📲 Quick Import Link

After deploying your API, you can share this shortcut with others or import via:

1. Open Shortcuts → Your shortcut
2. Tap Share → Copy iCloud Link
3. Share the link!

---

## 🎨 Customization

Change wallpaper style by modifying the URL:

| URL | Effect |
|-----|--------|
| `https://yearly-do65.vercel.app/api/wallpaper` | Default (iPhone 13 Pro Max) |
| `https://yearly-do65.vercel.app/api/wallpaper?device=iphone15promax` | iPhone 15 Pro Max size |
| `https://yearly-do65.vercel.app/api/wallpaper?device=macbook14` | MacBook Pro 14" |
| `https://yearly-do65.vercel.app/api/wallpaper?bg=#000000` | Pure black background |
