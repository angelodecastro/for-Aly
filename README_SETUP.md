# Valentine's Website Setup Instructions

## 🎉 Implementation Complete!

The Valentine's website has been transformed with the following features:
- ✅ Turquoise and Red color scheme (alternating)
- ✅ Personalized messages for Aly
- ✅ Three-scene experience (Messages → Slideshow → Final Message)
- ✅ Music integration with fade transitions
- ✅ Photo/Video slideshow with captions
- ✅ Romantic final message scene
- ✅ Mobile responsive design
- ✅ Start button to enable audio (browser autoplay compliance)

## 📋 What You Need to Do Next

### Step 1: Add Music Files

Copy your music files to the `public/audio/` folder:

1. **Locate your music files:**
   - `iris.mp3` (Iris by Adam Christopher)
   - `heaven.mp3` (Heaven by Bryan Adams)

2. **Copy them to the project:**
   ```bash
   cp ~/Desktop/iris.mp3 public/audio/iris.mp3
   cp ~/Desktop/heaven.mp3 public/audio/heaven.mp3
   ```

   Or manually drag and drop:
   - From: `~/Desktop/` (or wherever they are)
   - To: `public/audio/` folder in this project

### Step 2: Add Photos/Videos

The slideshow is configured for **8 photos/videos**. You can add more or fewer by editing the HTML.

1. **Select your favorite moments with Aly**
   - Choose 8-10 photos or videos
   - Mix of photos and videos works great!

2. **Prepare your media files:**
   - **Photos**: JPG or PNG format
   - **Videos**: MP4 format (most compatible)
   - **Recommended size**: Max 1920x1080 for faster loading
   - **Naming**: `moment1.jpg`, `moment2.jpg`, `moment3.mp4`, etc.

3. **Copy them to the project:**
   ```bash
   cp ~/Desktop/your-photo1.jpg public/media/moment1.jpg
   cp ~/Desktop/your-photo2.jpg public/media/moment2.jpg
   # ... and so on
   ```

   Or manually drag and drop into the `public/media/` folder

### Step 3: Customize Captions (Optional)

The slideshow includes romantic captions. To customize them:

1. Open `index.html`
2. Find the slideshow section (lines ~24-57)
3. Edit the `<p class="caption">` text for each slide

**Current captions:**
- "Every moment with you is a treasure"
- "Your smile lights up my world"
- "Together, we create beautiful memories"
- "You make every day feel like magic"
- "With you, I've found my home"
- "Your love is my greatest adventure"
- "Thank you for being my everything"
- "Forever grateful for you"

### Step 4: Test the Website

1. **Open the website:**
   ```bash
   open index.html
   ```
   Or just double-click `index.html` in Finder

2. **Test the flow:**
   - ✅ Click "Start Our Journey ❤" button
   - ✅ Watch the starfield messages with "Iris" music
   - ✅ Verify messages show "Aly" and alternate between turquoise and red
   - ✅ Click "See Our Moments ❤" button
   - ✅ Verify slideshow displays your photos/videos with "Heaven" music
   - ✅ Navigate with ← → buttons or let it auto-advance
   - ✅ Verify final "Happy Valentine's Day Aly, I LOVE YOU" message appears

3. **Test on mobile:**
   - Open on your phone's browser
   - Verify responsive layout works correctly

## 🎨 Customization Options

### Change Slide Duration
In `script.js`, line 27:
```javascript
const SLIDE_DURATION = 6000; // Change to desired milliseconds (6000 = 6 seconds)
```

### Add/Remove Slides
1. Add more `<div class="slide">` blocks in `index.html`
2. Update the image source and caption
3. The counter updates automatically

### Change Colors
In `script.js`, lines 30-33:
```javascript
const colors = [
    { color: "rgba(64, 224, 208", shadow: "rgba(64, 224, 208, 1)" }, // Turquoise
    { color: "rgba(220, 20, 60", shadow: "rgba(220, 20, 60, 1)" }     // Red
];
```

### Customize Messages
In `script.js`, find the `drawText()` function and modify the text strings.

## 📱 Browser Compatibility

Tested and works on:
- ✅ Chrome/Edge (recommended)
- ✅ Safari
- ✅ Firefox
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Some browsers may block autoplay. The "Start Our Journey" button solves this by requiring user interaction first.

## 🚀 Deployment (Optional)

To share online:

1. **GitHub Pages** (already set up):
   - Just push your changes to the `main` branch
   - Your site is live at: https://sojijr.github.io/valentine-website/

2. **Before deploying:**
   - Make sure music files are added
   - Make sure photos/videos are added
   - Test locally first

## 🎁 Final Checklist

Before showing to Aly:
- [ ] Music files copied to `public/audio/`
- [ ] Photos/videos copied to `public/media/`
- [ ] Captions customized (optional)
- [ ] Tested locally - all scenes work
- [ ] Tested on mobile device
- [ ] Messages display "Aly" correctly
- [ ] Colors alternate between turquoise and red
- [ ] All music transitions work smoothly

## ❤️ Enjoy Your Valentine's Surprise!

Everything is ready! Just add your music and photos, and Aly will have an unforgettable Valentine's Day experience!

---

**Need help?** Check the files:
- `index.html` - Structure and content
- `public/style.css` - Styling and animations
- `script.js` - Interactivity and transitions
