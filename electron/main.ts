import { app, session, BrowserWindow, ipcMain, Menu } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import net from 'node:net'
import os from 'node:os'
import { startListening } from './audioProcess'
console.log("main.ts")
import { screen } from 'electron'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const brightness = require('brightness')



// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST
console.log(process.versions)

let win: BrowserWindow | null
function createWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({
    width: 400, // Adjust the width as needed
    height: 600, // Adjust the height as needed
    x: screenWidth, // Start off-screen to the right
    y: 0, // Position from top
    alwaysOnTop: true,
    frame: false, // This removes the default frame
    show: false, // Don't show the window immediately
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Show window and start animation
  win.once('ready-to-show', () => {
    win!.show()
    win!.focus()
  })

  win.on('focus', () => {
    win!.show()
    animateWindow()
  })

  win.on('close', (e) => {
    e.preventDefault() // Prevent the window from closing immediately
    win!.webContents.send('clear-chat-messages')
  })

  win.on('blur', () => {
    animateWindowOut()
  })

  // Handle 'bring-to-foreground' event
  ipcMain.on('bring-to-foreground', () => {
    console.log("bring-to-foreground in the main process")
    if (win && !win.isDestroyed()) {
      win.show()
      win.focus()
    }
  })

  ipcMain.on('set-brightness', (_event, value: number) => {
    brightness.set(value)
    console.log("set brightness in the main process")
  })

  ipcMain.handle('get-emotion', async () => {
    console.log("get emotion in the main process")
    // randomly return "bad" : "not bad"
    return Math.random() < 0.5 ? "bad" : "not bad"
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win!.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  startListening(async (transcription) => {
    console.log("transcription: " + transcription)
    if (transcription.toLowerCase().includes('hello') || transcription.toLowerCase().includes('allo')) {
      console.log("key word detected, show window")
      win!.show()
      win!.focus()
      win!.webContents.send('keyword-detected')
    }
  }).catch(error => {
    console.error("Error in startListening:", error);
  });

  console.log("after setting up keyword listener")

  if (VITE_DEV_SERVER_URL) {
    const reactDevToolsPath = path.join(
      os.homedir(),
      '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\5.3.1_0'
    )
    console.log('VITE_DEV_SERVER_URL ' + VITE_DEV_SERVER_URL)
    session.defaultSession.loadExtension(reactDevToolsPath).then(() => {
      console.log('React DevTools loaded...')
      win!.loadURL(VITE_DEV_SERVER_URL)
    })
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

function animateWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize
  console.log("screenWidth: " + screenWidth)
  const targetX = screenWidth - 400
  let currentX = screenWidth

  const animate = () => {
    if (currentX > targetX) {
      currentX -= 20 // Adjust this value to change animation speed
      win!.setBounds({
        x: Math.floor(currentX),
        y: 0,
        width: 400,
        height: 600
      }, true) // The 'true' parameter enables animation
     setTimeout(animate, 10) // Adjust this value to change animation smoothness
    }
  }

  win!.show()
  animate()
}

function animateWindowOut() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize
  console.log("screenWidth: " + screenWidth)
  let currentX = screenWidth - 400
  
  const animate = () => {
    if (currentX < screenWidth) {
      currentX += 20 // Adjust for animation speed
      win!.setBounds({
        x: Math.floor(currentX),
        y: 0,
        width: 400,
        height: 600
      }, true)
      setTimeout(animate, 10)
    } else {
      // win!.hide()
    }
  }

  animate()
}

// Add this listener
ipcMain.on('chat-messages-cleared', () => {
  console.log('Chat messages cleared')
  app.exit() // Now exit the app
})

// Add these IPC handlers
ipcMain.on('minimize-window', () => {
  BrowserWindow.getFocusedWindow()?.minimize()
})

ipcMain.on('maximize-window', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win?.isMaximized()) {
    win.unmaximize()
  } else {
    win?.maximize()
  }
})

ipcMain.on('close-window', () => {
  BrowserWindow.getFocusedWindow()?.close()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // const mmap = require('mmap-io');
  // const fs = require('fs');
  // const os = require('os');

  // const filePath = path.join(os.tmpdir(), "hmx_shm");
  // const fd = fs.openSync(filePath, "r+");
  // const size = 1024;
  // const shm = mmap.map(size, mmap.PROT_READ, mmap.MAP_SHARED, fd, 0);
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

const template = [
  {
    label: 'File',
    submenu: [
      { label: 'New', click: () => { /* ... */ } },
      { label: 'Open', click: () => { /* ... */ } },
      { label: 'Save', click: () => { /* ... */ } },
    ]
  },
  // ... other menu items ...
];

app.on('ready', () => {
  // Set custom styles for the menu
  Menu.getApplicationMenu()!.items.forEach(item => {
    item.label = `<span style="font-size: 128px;">${item.label}</span>`;
  });
});
