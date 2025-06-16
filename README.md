# Windows 95 - Browser Edition 💻 (Made With Love By Hamdan Esmail 💖)

A fully functional Windows 95-styl that runs entirely in your web browser! Experience the nostalgia of the classic Windows 95 interface with modern web technologies.

## 🎯 Features

### 🖥️ Authentic Windows 95 UI
- **Pixel-perfect recreation** of the classic Windows 95 interface
- **Retro color scheme** with the iconic teal desktop pattern
- **Classic window chrome** with title bars, minimize/maximize/close buttons
- **Authentic taskbar** with Start button and system tray
- **Desktop icons** that you can double-click to launch applications

### 📁 Full File Manager Functionality
- **Navigate through folders** with realistic file system structure
- **Create, delete, and rename** files and folders
- **Copy, cut, and paste** operations with clipboard support
- **File selection** with Ctrl+click for multiple selection
- **Drag-and-drop** style interactions
- **Address bar** for direct navigation
- **Toolbar buttons** for common operations
- **Status bar** showing file counts and selection info

### 🎵 Immersive Audio Experience
- **Authentic Windows 95 sounds** generated using Web Audio API
- **Startup sound** when the app loads
- **Navigation sounds** for clicks and folder changes
- **Error sounds** for invalid operations
- **Action feedback** sounds for file operations

### 🖱️ Interactive Elements
- **Start Menu** with classic Windows 95 programs
- **Context menus** with right-click support
- **Modal dialogs** for confirmations and properties
- **Keyboard shortcuts** (Ctrl+C, Ctrl+V, Ctrl+X, F5, Delete)
- **Responsive design** that works on different screen sizes

### 💾 Sample File System
- **Realistic folder structure** with C:, A:, and D: drives
- **Various file types** with appropriate icons
- **File properties** including size and modification dates
- **Nested folders** with breadcrumb navigation
- **Empty states** and error handling

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in any modern web browser
3. **Enjoy the nostalgia!** - No installation required

Then open http://localhost:8000 in your browser.

## 🎮 How to Use

### Desktop
- **Double-click desktop icons** to launch applications
- **Right-click** anywhere for context menu
- **Click the Start button** to access the Start Menu

### File Manager
- **Double-click folders** to navigate into them
- **Use toolbar buttons** for navigation (Back, Forward, Up)
- **Right-click files** for context menu options
- **Create new files/folders** using toolbar or File menu
- **Select multiple files** with Ctrl+click

### Keyboard Shortcuts
- `Ctrl+C` - Copy selected files
- `Ctrl+V` - Paste files
- `Ctrl+X` - Cut files
- `Ctrl+A` - Select all files
- `Ctrl+N` - Create new file
- `Delete` - Delete selected files
- `F5` - Refresh current folder

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Pixel-perfect Windows 95 styling with modern techniques
- **Vanilla JavaScript** - No frameworks, pure ES6+ code
- **Web Audio API** - For authentic sound effects
- **Local Storage** - For saving user preferences (future enhancement)

### Browser Compatibility
- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

### Performance Features
- **Efficient DOM manipulation** with minimal reflows
- **Event delegation** for better performance
- **Lazy loading** of file icons and thumbnails
- **Optimized CSS** with hardware acceleration

## 🎨 Customization

### Adding New File Types
Edit the `generateSampleFiles()` method in `script.js` to add new file types with custom icons:

```javascript
{ 
    name: 'MyFile.pdf', 
    type: 'file', 
    icon: '📋', 
    size: '1.2 MB', 
    modified: '6/16/2025 2:30 PM' 
}
```

### Custom Sounds
Modify the sound methods in the `Windows95FileManager` class to customize audio feedback:

```javascript
playCustomSound(frequency, duration) {
    // Your custom sound logic here
}
```

### Styling Changes
All visual styles are in `styles.css`. Key sections:
- `.window` - Window appearance
- `.taskbar` - Taskbar styling
- `.file-item` - File icon appearance
- `.desktop` - Desktop background

## 🐛 Known Limitations

- **File operations are simulated** - no actual file system access
- **Sound effects** may not work in all browsers due to autoplay policies
- **Mobile experience** is optimized but not as smooth as desktop
- **No actual program execution** - programs show placeholder dialogs

## 🚧 Future Enhancements

- [ ] **More applications** - Calculator, Notepad, Paint, Solitaire
- [ ] **File content editing** - Basic text editor functionality
- [ ] **Image thumbnails** - Preview for image files
- [ ] **Drag and drop** - File operations with mouse
- [ ] **Window management** - Multiple windows, Z-order
- [ ] **Network drives** - Simulated network locations
- [ ] **User preferences** - Customizable desktop and settings

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- **Report bugs** by opening an issue
- **Suggest features** for future versions
- **Submit pull requests** with improvements
- **Share feedback** about the user experience

## 🎉 Acknowledgments

- **Microsoft** - For creating the iconic Windows 95 interface
- **Web developers** - For modern browser APIs that make this possible
- **Retro computing community** - For keeping the spirit of classic interfaces alive

---

**Made with ❤️ and nostalgia for the golden age of personal computing!**

*Experience Windows 95 without the dial-up modem sounds!* 📞🚫
