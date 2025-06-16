// Windows 95 File Manager JavaScript

class Windows95FileManager {
    constructor() {
        this.currentPath = 'C:\\Windows\\Desktop';
        this.viewMode = 'icons'; // 'icons' or 'list'
        this.selectedFiles = new Set();
        this.clipboard = [];
        this.history = ['C:\\Windows\\Desktop'];
        this.historyIndex = 0;
        this.files = this.generateSampleFiles();
        
        this.init();
    }
    
    init() {
        this.updateClock();
        this.loadCurrentDirectory();
        this.setupEventListeners();
        this.playStartupSound();
        
        // Update clock every second
        setInterval(() => this.updateClock(), 1000);
    }
    
    generateSampleFiles() {
        return {
            'C:\\Windows\\Desktop': [
                { name: 'My Computer', type: 'folder', icon: '💻', size: '', modified: '6/16/2025 12:00 PM' },
                { name: 'Recycle Bin', type: 'folder', icon: '🗑️', size: '', modified: '6/16/2025 12:00 PM' },
                { name: 'My Documents', type: 'folder', icon: '📁', size: '', modified: '6/16/2025 12:00 PM' },
                { name: 'Internet Explorer', type: 'application', icon: '🌐', size: '2.1 MB', modified: '6/16/2025 11:30 AM' },
                { name: 'Notepad', type: 'application', icon: '📝', size: '128 KB', modified: '6/16/2025 11:30 AM' },
                { name: 'Calculator', type: 'application', icon: '🧮', size: '64 KB', modified: '6/16/2025 11:30 AM' },
                { name: 'Paint', type: 'application', icon: '🎨', size: '512 KB', modified: '6/16/2025 11:30 AM' },
                { name: 'Solitaire', type: 'application', icon: '🃏', size: '256 KB', modified: '6/16/2025 11:30 AM' },
                { name: 'ReadMe.txt', type: 'file', icon: '📄', size: '2 KB', modified: '6/16/2025 10:45 AM' },
                { name: 'System.ini', type: 'file', icon: '⚙️', size: '1 KB', modified: '6/16/2025 10:30 AM' }
            ],
            'C:\\Windows\\Desktop\\My Documents': [
                { name: 'Letter to Mom.doc', type: 'file', icon: '📝', size: '24 KB', modified: '6/15/2025 3:30 PM' },
                { name: 'Budget 2025.xls', type: 'file', icon: '📊', size: '45 KB', modified: '6/14/2025 2:15 PM' },
                { name: 'Vacation Photos', type: 'folder', icon: '📁', size: '', modified: '6/13/2025 4:20 PM' },
                { name: 'Work Projects', type: 'folder', icon: '📁', size: '', modified: '6/12/2025 9:00 AM' }
            ],
            'C:\\Windows\\Desktop\\My Documents\\Vacation Photos': [
                { name: 'Beach.bmp', type: 'file', icon: '🖼️', size: '2.1 MB', modified: '6/10/2025 2:30 PM' },
                { name: 'Sunset.bmp', type: 'file', icon: '🖼️', size: '1.8 MB', modified: '6/10/2025 6:45 PM' },
                { name: 'Family.bmp', type: 'file', icon: '🖼️', size: '2.3 MB', modified: '6/11/2025 10:15 AM' }
            ],
            'C:\\': [
                { name: 'Windows', type: 'folder', icon: '📁', size: '', modified: '6/16/2025 12:00 PM' },
                { name: 'Program Files', type: 'folder', icon: '📁', size: '', modified: '6/16/2025 12:00 PM' },
                { name: 'TEMP', type: 'folder', icon: '📁', size: '', modified: '6/16/2025 11:45 AM' },
                { name: 'CONFIG.SYS', type: 'file', icon: '⚙️', size: '1 KB', modified: '6/16/2025 12:00 PM' },
                { name: 'AUTOEXEC.BAT', type: 'file', icon: '⚙️', size: '512 bytes', modified: '6/16/2025 12:00 PM' }
            ],
            'A:\\': [
                { name: 'BACKUP.ZIP', type: 'file', icon: '📦', size: '1.2 MB', modified: '6/15/2025 4:30 PM' }
            ],
            'D:\\': [
                { name: 'Setup.exe', type: 'application', icon: '💿', size: '15.2 MB', modified: '6/1/2025 10:00 AM' },
                { name: 'README.TXT', type: 'file', icon: '📄', size: '3 KB', modified: '6/1/2025 10:00 AM' }
            ]
        };
    }
    
    setupEventListeners() {
        // Right-click context menu
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(e.clientX, e.clientY);
        });
        
        // Click to hide menus
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
                document.getElementById('startMenu').classList.remove('show');
            }
            if (!e.target.closest('.context-menu')) {
                document.getElementById('contextMenu').classList.remove('show');
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 'c': this.copyFile(); break;
                    case 'v': this.pasteFile(); break;
                    case 'x': this.cutFile(); break;
                    case 'a': this.selectAll(); break;
                    case 'n': this.createFile(); break;
                }
            }
            if (e.key === 'Delete') {
                this.deleteFile();
            }
            if (e.key === 'F5') {
                e.preventDefault();
                this.refresh();
            }
        });
        
        // File double-click handling
        document.addEventListener('dblclick', (e) => {
            if (e.target.closest('.file-item')) {
                const fileName = e.target.closest('.file-item').dataset.filename;
                this.openFile(fileName);
            }
        });
        
        // File selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.file-item')) {
                const fileItem = e.target.closest('.file-item');
                if (!e.ctrlKey) {
                    this.clearSelection();
                }
                this.selectFile(fileItem);
            } else if (e.target.closest('.main-view')) {
                this.clearSelection();
            }
        });
    }
    
    updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: 'numeric', 
            minute: '2-digit'
        });
        document.getElementById('clock').textContent = time;
    }
    
    loadCurrentDirectory() {
        const fileList = document.getElementById('fileList');
        const files = this.files[this.currentPath] || [];
        
        fileList.innerHTML = '';
        
        files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.className = 'file-item';
            fileElement.dataset.filename = file.name;
            fileElement.dataset.type = file.type;
            
            fileElement.innerHTML = `
                <div class="file-icon">${file.icon}</div>
                <div class="file-name">${file.name}</div>
            `;
            
            fileList.appendChild(fileElement);
        });
        
        // Update address bar
        document.getElementById('addressInput').value = this.currentPath;
        
        // Update status bar
        document.getElementById('fileCount').textContent = `${files.length} object${files.length !== 1 ? 's' : ''}`;
        document.getElementById('statusText').textContent = 'Ready';
        
        this.clearSelection();
    }
    
    navigateTo(path) {
        if (this.files[path]) {
            this.currentPath = path;
            this.addToHistory(path);
            this.loadCurrentDirectory();
            this.playNavigationSound();
        } else {
            this.showError('Path not found', `The path "${path}" could not be found.`);
        }
    }
    
    addToHistory(path) {
        this.historyIndex++;
        this.history = this.history.slice(0, this.historyIndex);
        this.history.push(path);
    }
    
    goBack() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.currentPath = this.history[this.historyIndex];
            this.loadCurrentDirectory();
            this.playNavigationSound();
        }
    }
    
    goForward() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.currentPath = this.history[this.historyIndex];
            this.loadCurrentDirectory();
            this.playNavigationSound();
        }
    }
    
    goUp() {
        const pathParts = this.currentPath.split('\\');
        if (pathParts.length > 1) {
            pathParts.pop();
            const parentPath = pathParts.join('\\') || 'C:';
            this.navigateTo(parentPath);
        }
    }
    
    refresh() {
        this.loadCurrentDirectory();
        this.playRefreshSound();
        this.showStatus('Refreshed');
    }
    
    selectFile(fileElement) {
        fileElement.classList.add('selected');
        this.selectedFiles.add(fileElement.dataset.filename);
        this.updateSelectionInfo();
    }
    
    clearSelection() {
        document.querySelectorAll('.file-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        this.selectedFiles.clear();
        this.updateSelectionInfo();
    }
    
    selectAll() {
        document.querySelectorAll('.file-item').forEach(item => {
            this.selectFile(item);
        });
    }
    
    updateSelectionInfo() {
        const count = this.selectedFiles.size;
        const info = count > 0 ? `${count} object${count !== 1 ? 's' : ''} selected` : '';
        document.getElementById('selectedInfo').textContent = info;
    }
    
    openFile(filename) {
        const files = this.files[this.currentPath] || [];
        const file = files.find(f => f.name === filename);
        
        if (!file) return;
        
        if (file.type === 'folder') {
            const newPath = `${this.currentPath}\\${filename}`;
            this.navigateTo(newPath);
        } else {
            this.playOpenSound();
            this.showInfo('File Opened', `Opening "${filename}" with default application.`);
        }
    }
    
    createFolder() {
        const name = prompt('Enter folder name:', 'New Folder');
        if (name && name.trim()) {
            const files = this.files[this.currentPath] || [];
            files.push({
                name: name.trim(),
                type: 'folder',
                icon: '📁',
                size: '',
                modified: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            });
            this.loadCurrentDirectory();
            this.playCreateSound();
            this.showStatus(`Created folder "${name}"`);
        }
    }
    
    createFile() {
        const name = prompt('Enter file name:', 'New File.txt');
        if (name && name.trim()) {
            const files = this.files[this.currentPath] || [];
            const extension = name.split('.').pop().toLowerCase();
            let icon = '📄';
            
            if (['txt', 'log'].includes(extension)) icon = '📝';
            else if (['bmp', 'jpg', 'gif'].includes(extension)) icon = '🖼️';
            else if (['exe', 'com'].includes(extension)) icon = '⚙️';
            else if (['doc'].includes(extension)) icon = '📝';
            else if (['xls'].includes(extension)) icon = '📊';
            
            files.push({
                name: name.trim(),
                type: 'file',
                icon: icon,
                size: '0 KB',
                modified: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            });
            this.loadCurrentDirectory();
            this.playCreateSound();
            this.showStatus(`Created file "${name}"`);
        }
    }
    
    deleteFile() {
        if (this.selectedFiles.size === 0) {
            this.showError('No Selection', 'Please select files to delete.');
            return;
        }
        
        const fileNames = Array.from(this.selectedFiles);
        const message = fileNames.length === 1 
            ? `Are you sure you want to delete "${fileNames[0]}"?`
            : `Are you sure you want to delete these ${fileNames.length} items?`;
            
        if (confirm(message)) {
            const files = this.files[this.currentPath] || [];
            this.files[this.currentPath] = files.filter(file => !this.selectedFiles.has(file.name));
            this.loadCurrentDirectory();
            this.playDeleteSound();
            this.showStatus(`Deleted ${fileNames.length} item${fileNames.length !== 1 ? 's' : ''}`);
        }
    }
    
    copyFile() {
        if (this.selectedFiles.size === 0) {
            this.showError('No Selection', 'Please select files to copy.');
            return;
        }
        
        const files = this.files[this.currentPath] || [];
        this.clipboard = files.filter(file => this.selectedFiles.has(file.name));
        this.clipboardOperation = 'copy';
        this.showStatus(`Copied ${this.clipboard.length} item${this.clipboard.length !== 1 ? 's' : ''}`);
    }
    
    cutFile() {
        if (this.selectedFiles.size === 0) {
            this.showError('No Selection', 'Please select files to cut.');
            return;
        }
        
        const files = this.files[this.currentPath] || [];
        this.clipboard = files.filter(file => this.selectedFiles.has(file.name));
        this.clipboardOperation = 'cut';
        this.showStatus(`Cut ${this.clipboard.length} item${this.clipboard.length !== 1 ? 's' : ''}`);
    }
    
    pasteFile() {
        if (this.clipboard.length === 0) {
            this.showError('Clipboard Empty', 'Nothing to paste.');
            return;
        }
        
        const files = this.files[this.currentPath] || [];
        
        this.clipboard.forEach(file => {
            let newName = file.name;
            let counter = 1;
            
            // Handle name conflicts
            while (files.some(f => f.name === newName)) {
                const nameParts = file.name.split('.');
                if (nameParts.length > 1) {
                    const extension = nameParts.pop();
                    const baseName = nameParts.join('.');
                    newName = `${baseName} (${counter}).${extension}`;
                } else {
                    newName = `${file.name} (${counter})`;
                }
                counter++;
            }
            
            files.push({
                ...file,
                name: newName,
                modified: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
            });
        });
        
        if (this.clipboardOperation === 'cut') {
            // Remove original files after cut operation
            // (This would need to track source path in real implementation)
            this.clipboard = [];
        }
        
        this.loadCurrentDirectory();
        this.playPasteSound();
        this.showStatus('Pasted items');
    }
    
    renameFile() {
        if (this.selectedFiles.size !== 1) {
            this.showError('Invalid Selection', 'Please select exactly one file to rename.');
            return;
        }
        
        const oldName = Array.from(this.selectedFiles)[0];
        const newName = prompt('Enter new name:', oldName);
        
        if (newName && newName.trim() && newName !== oldName) {
            const files = this.files[this.currentPath] || [];
            const file = files.find(f => f.name === oldName);
            if (file) {
                file.name = newName.trim();
                this.loadCurrentDirectory();
                this.showStatus(`Renamed to "${newName}"`);
            }
        }
    }
    
    showProperties() {
        if (this.selectedFiles.size !== 1) {
            this.showError('Invalid Selection', 'Please select exactly one file to view properties.');
            return;
        }
        
        const fileName = Array.from(this.selectedFiles)[0];
        const files = this.files[this.currentPath] || [];
        const file = files.find(f => f.name === fileName);
        
        if (file) {
            const properties = `
                <strong>Name:</strong> ${file.name}<br>
                <strong>Type:</strong> ${file.type}<br>
                <strong>Size:</strong> ${file.size || 'N/A'}<br>
                <strong>Modified:</strong> ${file.modified}<br>
                <strong>Location:</strong> ${this.currentPath}
            `;
            this.showInfo(`${file.name} Properties`, properties);
        }
    }
    
    toggleView() {
        this.viewMode = this.viewMode === 'icons' ? 'list' : 'icons';
        // In a full implementation, this would change the file display format
        this.showStatus(`View changed to ${this.viewMode}`);
    }
    
    showContextMenu(x, y) {
        const contextMenu = document.getElementById('contextMenu');
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        contextMenu.classList.add('show');
    }
    
    showStatus(message) {
        document.getElementById('statusText').textContent = message;
        setTimeout(() => {
            document.getElementById('statusText').textContent = 'Ready';
        }, 3000);
    }
    
    showInfo(title, message) {
        this.showModal(title, message, ['OK']);
    }
    
    showError(title, message) {
        this.showModal(title, message, ['OK']);
        this.playErrorSound();
    }
    
    showModal(title, message, buttons = ['OK', 'Cancel']) {
        const modal = document.getElementById('modal');
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = message;
        modal.classList.add('show');
    }
    
    closeModal() {
        document.getElementById('modal').classList.remove('show');
    }
    
    // Sound effects (using Web Audio API or simple beeps)
    playStartupSound() {
        this.playSound(800, 100);
        setTimeout(() => this.playSound(600, 100), 100);
        setTimeout(() => this.playSound(800, 200), 200);
    }
    
    playNavigationSound() {
        this.playSound(400, 50);
    }
    
    playOpenSound() {
        this.playSound(600, 100);
        setTimeout(() => this.playSound(800, 100), 100);
    }
    
    playCreateSound() {
        this.playSound(500, 100);
    }
    
    playDeleteSound() {
        this.playSound(300, 200);
    }
    
    playPasteSound() {
        this.playSound(700, 100);
    }
    
    playRefreshSound() {
        this.playSound(500, 50);
        setTimeout(() => this.playSound(700, 50), 100);
    }
    
    playErrorSound() {
        this.playSound(200, 300);
    }
    
    playSound(frequency, duration) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        } catch (e) {
            // Fallback for browsers that don't support Web Audio API
            console.log('Sound played:', frequency + 'Hz for ' + duration + 'ms');
        }
    }
}

// Window management functions
function minimizeWindow() {
    document.getElementById('fileManager').style.display = 'none';
    document.querySelector('.taskbar-button').classList.remove('active');
    fileManager.playNavigationSound();
}

function maximizeWindow() {
    const window = document.getElementById('fileManager');
    if (window.classList.contains('maximized')) {
        window.classList.remove('maximized');
        window.style.width = '800px';
        window.style.height = '600px';
        window.style.top = '50%';
        window.style.left = '50%';
        window.style.transform = 'translate(-50%, -50%)';
    } else {
        window.classList.add('maximized');
        window.style.width = '100vw';
        window.style.height = 'calc(100vh - 28px)';
        window.style.top = '0';
        window.style.left = '0';
        window.style.transform = 'none';
    }
    fileManager.playNavigationSound();
}

function closeWindow() {
    if (confirm('Are you sure you want to close File Manager?')) {
        document.getElementById('fileManager').style.display = 'none';
        document.querySelector('.taskbar-button').style.display = 'none';
        fileManager.playNavigationSound();
    }
}

function showWindow(windowId) {
    document.getElementById(windowId).style.display = 'block';
    document.querySelector('.taskbar-button').classList.add('active');
    fileManager.playNavigationSound();
}

// Start menu functions
function toggleStartMenu() {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.querySelector('.start-button');
    
    if (startMenu.classList.contains('show')) {
        startMenu.classList.remove('show');
        startButton.classList.remove('active');
    } else {
        startMenu.classList.add('show');
        startButton.classList.add('active');
    }
    fileManager.playNavigationSound();
}

// Desktop icon functions
function openMyComputer() {
    fileManager.navigateTo('C:');
    openFileManager();
}

function openRecycleBin() {
    fileManager.showInfo('Recycle Bin', 'The Recycle Bin is empty.');
}

function openFileManager() {
    document.getElementById('fileManager').style.display = 'block';
    document.querySelector('.taskbar-button').style.display = 'block';
    document.querySelector('.taskbar-button').classList.add('active');
    fileManager.playOpenSound();
}

function openNotepad() {
    fileManager.showInfo('Notepad', 'Notepad would open here in a full implementation.');
}

// Program launcher
function openProgram(program) {
    const programs = {
        calculator: 'Calculator would open here.',
        notepad: 'Notepad would open here.',
        paint: 'Paint would open here.',
        solitaire: 'Solitaire would open here.',
        settings: 'Control Panel would open here.',
        help: 'Windows Help would open here.'
    };
    
    fileManager.showInfo(program.charAt(0).toUpperCase() + program.slice(1), 
        programs[program] || 'Program not found.');
    
    document.getElementById('startMenu').classList.remove('show');
    document.querySelector('.start-button').classList.remove('active');
}

function shutdown() {
    if (confirm('Are you sure you want to shut down Windows 95?')) {
        document.body.innerHTML = '<div style="background: #000; color: #fff; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 24px;">It\'s now safe to turn off your computer.</div>';
    }
    document.getElementById('startMenu').classList.remove('show');
    document.querySelector('.start-button').classList.remove('active');
}

// Global function bindings for HTML onclick events
window.minimizeWindow = minimizeWindow;
window.maximizeWindow = maximizeWindow;
window.closeWindow = closeWindow;
window.showWindow = showWindow;
window.toggleStartMenu = toggleStartMenu;
window.openMyComputer = openMyComputer;
window.openRecycleBin = openRecycleBin;
window.openFileManager = openFileManager;
window.openNotepad = openNotepad;
window.openProgram = openProgram;
window.shutdown = shutdown;

// Bind file manager methods to global scope for HTML onclick events
window.goBack = () => fileManager.goBack();
window.goForward = () => fileManager.goForward();
window.goUp = () => fileManager.goUp();
window.createFolder = () => fileManager.createFolder();
window.createFile = () => fileManager.createFile();
window.toggleView = () => fileManager.toggleView();
window.refresh = () => fileManager.refresh();
window.navigateTo = (path) => fileManager.navigateTo(path);
window.editAddress = () => {
    const input = document.getElementById('addressInput');
    input.removeAttribute('readonly');
    input.select();
    input.addEventListener('blur', () => {
        input.setAttribute('readonly', true);
    });
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fileManager.navigateTo(input.value);
            input.blur();
        }
    });
};
window.toggleFolder = (element) => {
    element.classList.toggle('expanded');
    fileManager.playNavigationSound();
};
window.showMenu = (menu) => {
    fileManager.showInfo('Menu', `${menu.charAt(0).toUpperCase() + menu.slice(1)} menu would open here.`);
};
window.openFile = () => {
    if (fileManager.selectedFiles.size === 1) {
        const fileName = Array.from(fileManager.selectedFiles)[0];
        fileManager.openFile(fileName);
    }
};
window.cutFile = () => fileManager.cutFile();
window.copyFile = () => fileManager.copyFile();
window.pasteFile = () => fileManager.pasteFile();
window.deleteFile = () => fileManager.deleteFile();
window.renameFile = () => fileManager.renameFile();
window.showProperties = () => fileManager.showProperties();
window.closeModal = () => fileManager.closeModal();

// Initialize the file manager when the page loads
let fileManager;
document.addEventListener('DOMContentLoaded', () => {
    fileManager = new Windows95FileManager();
});
