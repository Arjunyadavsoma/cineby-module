# Cineby TizenBrew Module

> Enhance your Cineby.gd streaming experience on Samsung Tizen Smart TVs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TizenBrew](https://img.shields.io/badge/TizenBrew-Module-blue)](https://github.com/reisxd/TizenBrew)

## 🎬 Features

- **🎮 TV Remote Navigation** - Full arrow key navigation with visual focus indicators
- **📺 Optimized UI** - Larger text and buttons designed for TV viewing distance
- **🎞️ Enhanced Video Controls** - Media key support for play/pause, seek forward/back
- **⌨️ Smart Keyboard** - Easy text input with on-screen hints
- **🎨 TV-Friendly Design** - Custom CSS optimizations for better readability
- **🚀 Performance** - Lightweight and fast, built specifically for Tizen

## 📋 Requirements

- Samsung Tizen Smart TV (2017 or newer)
- [TizenBrew](https://github.com/reisxd/TizenBrew) installed on your TV
- Internet connection

## 🚀 Installation

### Method 1: Via TizenBrew (Recommended)

1. Open **TizenBrew** on your Samsung TV
2. Press the **GREEN** button on your remote
3. Enter the module name: `@yourusername/cineby-tizen`
4. Press **GREEN** again to install
5. Launch **Cineby** from the module list
6. Enjoy! 🎉

### Method 2: Via NPM Package Name

If you've published to NPM, users can install with:
```
@yourusername/cineby-tizen
```

### Method 3: Via GitHub (Development)

```
github:yourusername/cineby-tizen
```

## 🎮 Remote Control Guide

### Navigation
- **Arrow Keys** ⬆️⬇️⬅️➡️ - Navigate between elements
- **Enter/OK** ✓ - Select/Activate focused element
- **Back** ⬅ - Go back to previous page

### Video Playback
- **Play/Pause** ⏯️ - Toggle video playback
- **Forward** ⏩ - Skip forward 10 seconds
- **Rewind** ⏪ - Skip backward 10 seconds
- **Stop** ⏹️ - Stop video and reset to beginning
- **Arrow Left/Right** (during video) - Seek backward/forward

### Quick Actions
- **Number Keys 0-9** - Quick navigation (customizable)
- **Color Buttons** 🔴🟢🟡🔵 - Custom actions (can be configured)

## 🛠️ Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cineby-tizen.git
cd cineby-tizen
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install mods dependencies
cd mods
npm install
cd ..

# Install service dependencies (optional)
cd service
npm install
cd ..
```

3. Build the module:
```bash
npm run build
```

### Development Mode

Watch for changes and rebuild automatically:
```bash
npm run dev
```

### Project Structure

```
cineby-tizen/
├── dist/                 # Built files (generated)
│   ├── userScript.js    # Compiled user script
│   └── service.js       # Compiled service (optional)
├── mods/                # User script source
│   ├── src/
│   │   └── index.js     # Main script
│   ├── package.json
│   └── webpack.config.js
├── service/             # Backend service (optional)
│   ├── index.js
│   └── package.json
├── package.json         # Module configuration
├── README.md
└── LICENSE
```

### Configuration

Edit `package.json` to customize:

```json
{
  "websiteURL": "https://www.cineby.gd/",
  "keys": ["MediaPlayPause", "MediaPlay", ...],
  "evaluateScriptOnDocumentStart": false
}
```

## 🧪 Testing

### Local Browser Testing

1. Build the module: `npm run build`
2. Open Cineby.gd in your browser
3. Open Developer Console (F12)
4. Copy and paste contents of `dist/userScript.js`
5. Press Enter to execute

### TV Testing

1. Install TizenBrew on your Samsung TV
2. Add your module via NPM or GitHub
3. Launch and test all features
4. Use remote control to verify navigation

## 📦 Publishing

### Publish to NPM

1. Create an account at [npmjs.com](https://www.npmjs.com/)
2. Login via CLI:
```bash
npm login
```

3. Update version in `package.json`:
```bash
npm version patch  # or minor, major
```

4. Publish:
```bash
npm publish --access public
```

### Publish to GitHub Packages

1. Add to `package.json`:
```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

2. Create GitHub token with `write:packages` permission

3. Login:
```bash
npm login --registry=https://npm.pkg.github.com
```

4. Publish:
```bash
npm publish
```

## 🐛 Troubleshooting

### Module Not Loading
- Check that TizenBrew is properly installed
- Verify `websiteURL` matches exactly
- Ensure `dist/userScript.js` exists after build

### Navigation Not Working
- Some TVs may use different key codes
- Check console logs for key press events
- Try adjusting `CONFIG.focusColor` for better visibility

### Video Controls Not Responding
- Verify media keys are listed in `package.json`
- Check if Tizen API is available on your TV model
- Try restarting the TV

### Focus Indicator Not Visible
- Adjust `CONFIG.focusColor` in `mods/src/index.js`
- Try increasing `CONFIG.focusWidth`
- Check if site CSS is overriding styles

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TizenBrew](https://github.com/reisxd/TizenBrew) - The platform that makes this possible
- [Cineby.gd](https://www.cineby.gd/) - Great streaming service
- Samsung Tizen Team - For the TV platform

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/cineby-tizen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/cineby-tizen/discussions)
- **Email**: your.email@example.com

## 🔗 Links

- [TizenBrew Documentation](https://github.com/reisxd/TizenBrew/blob/main/docs/MODULES.md)
- [Cineby Website](https://www.cineby.gd/)
- [Report a Bug](https://github.com/yourusername/cineby-tizen/issues/new)

---

Made with ❤️ for Samsung Tizen Smart TV users