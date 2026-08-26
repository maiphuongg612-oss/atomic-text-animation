# Atomic Text Animation 🎬

Interactive animation project featuring atomic particles morphing through 3D shapes and forming text, with background music. Netflix-style visual effects.

## 🎯 Features

✨ **Animation Phases:**
1. **Random Particle Motion** - Particles move freely in 3D space
2. **Sphere Formation** - Particles gather into a 3D sphere
3. **Sphere Rotation** - Sphere rotates smoothly
4. **Helix Transformation** - Sphere transforms into DNA-like helix
5. **Helix Rotation** - Helix rotates and displays
6. **Text Formation** - Particles arrange into random motivational text

🎨 **Design Features:**
- Eon-style color palette (subtle blues and cyans)
- Full 3D effects using Three.js
- Responsive design (Desktop & Mobile)
- Background "Attention" music loop
- Smooth transitions between phases

🎵 **Audio:**
- Ambient background music throughout animation
- Auto-plays on first user interaction
- Volume control available

📱 **Responsive:**
- Adapts to desktop, tablet, and mobile screens
- Canvas scales perfectly on all devices

## 🛠️ Configuration

Edit `config.js` to customize:

```javascript
CONFIG.particles.count = 120;        // Number of particles
CONFIG.timing.particlePhase = 2000;  // Duration of each phase (ms)
CONFIG.sphere.radius = 150;          // Sphere size
CONFIG.helix.radiusX = 120;          // Helix width
CONFIG.helix.turns = 3;              // Helix loops
CONFIG.audio.volume = 0.3;           // Music volume (0-1)
```

### Customizable Options:

| Setting | Description | Default |
|---------|-------------|----------|
| `particles.count` | Number of animated particles | 120 |
| `particles.color` | Particle color (hex) | 0x6496ff |
| `timing.particlePhase` | Random movement duration (ms) | 2000 |
| `timing.sphereFormation` | Sphere formation duration (ms) | 2000 |
| `timing.sphereRotate` | Sphere rotation duration (ms) | 2000 |
| `timing.helixTransform` | Helix transformation duration (ms) | 2000 |
| `timing.helixRotate` | Helix rotation duration (ms) | 3000 |
| `sphere.radius` | Sphere size | 150 |
| `sphere.rotationSpeed` | Sphere rotation speed | 0.003 |
| `helix.radiusX` | Helix horizontal radius | 120 |
| `helix.radiusY` | Helix vertical radius | 80 |
| `helix.turns` | Number of helix turns | 3 |
| `audio.volume` | Background music volume | 0.3 |

## 🎬 Animation Timeline

```
Total Duration: ~15 seconds (repeats)
├── 0-2s:   Particles float randomly
├── 2-4s:   Particles form sphere
├── 4-6s:   Sphere rotates
├── 6-8s:   Transform to helix
├── 8-11s:  Helix rotates
└── 11-15s: Text forms and displays
```

## 📂 File Structure

```
atomic-text-animation/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Main animation logic (Three.js)
├── config.js       # Configuration settings
└── README.md       # This file
```

## 🚀 How to Use

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/maiphuongg612-oss/atomic-text-animation.git
cd atomic-text-animation
```

2. Open `index.html` in your browser (or use a local server):
```bash
python -m http.server 8000
# Then visit http://localhost:8000
```

### GitHub Pages (Live Demo)
1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch
4. Visit: `https://maiphuongg612-oss.github.io/atomic-text-animation/`

## 🎨 Color Palette (Eon Style)

```css
Primary Blue:    #6496ff (rgb(100, 150, 255))
Cyan:            #64d5ff (rgb(100, 213, 255))
Sky Blue:        #7dd3fc (rgb(125, 211, 252))
Dark Background: #0a0e27 (rgb(10, 14, 39))
```

## 🎵 Audio Source

Background music: Mixkit "Attention" - Royalty free
- URL: `https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3`
- License: Free for commercial use

## 🔧 Technologies

- **Three.js** - 3D graphics library
- **HTML5 Canvas** - Drawing surface
- **WebGL** - GPU acceleration
- **Vanilla JavaScript** - Animation logic
- **CSS3** - Styling and responsive design

## 📋 Messages (Random Display)

The animation displays one of these messages at the end:
- "All the best to you"
- "Believe in yourself"
- "Fingers crossed"

To add more messages, edit `config.js`:
```javascript
CONFIG.messages = [
    "Your message here",
    "Another message",
    "..."
]
```

## 🎮 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive

## 📱 Mobile Optimization

- Touch-friendly interface
- Adaptive particle count for performance
- Responsive canvas sizing
- Optimized for landscape and portrait

## 🐛 Troubleshooting

### Audio not playing?
- Check browser autoplay permissions
- Click on the page to start audio
- Check browser console for errors

### Animation stuttering?
- Reduce `CONFIG.particles.count`
- Lower quality graphics settings
- Close other browser tabs

### Particles not visible?
- Check WebGL support in browser
- Ensure Three.js CDN is accessible
- Check browser console for errors

## 📄 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Found a bug? Want to improve something?
- Fork the repository
- Create a feature branch
- Submit a pull request

## 📞 Support

For issues or questions, create an issue on GitHub or contact the repository owner.

---

**Made with ❤️ by [maiphuongg612-oss](https://github.com/maiphuongg612-oss)**