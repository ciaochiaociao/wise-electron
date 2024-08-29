import { app, BrowserWindow, ipcMain, session } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
const require2 = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brightness = require2("brightness");
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
console.log(process.versions);
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  ipcMain.on("set-brightness", (_event, value) => {
    brightness.set(value);
    console.log("set brightness in the main process");
  });
  ipcMain.handle("get-emotion", async () => {
    console.log("get emotion in the main process");
    return Math.random() < 0.5 ? "bad" : "not bad";
  });
  win.webContents.on("did-finish-load", () => {
    win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    const reactDevToolsPath = path.join(
      os.homedir(),
      "\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\5.3.1_0"
    );
    console.log("VITE_DEV_SERVER_URL " + VITE_DEV_SERVER_URL);
    session.defaultSession.loadExtension(reactDevToolsPath).then(() => {
      console.log("React DevTools loaded...");
      win.loadURL(VITE_DEV_SERVER_URL);
    });
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
