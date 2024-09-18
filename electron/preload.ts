import { ipcRenderer, contextBridge } from 'electron'
// import brightness from 'brightness'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})

contextBridge.exposeInMainWorld('systemControls', {
  setBrightness: (value: number) => {
    console.log(value)
    ipcRenderer.send('set-brightness', value);
  },
  bringToForeground: () => {
    ipcRenderer.send('bring-to-foreground');
  },
  bringToBackground: () => {
    ipcRenderer.send('bring-to-background');
  }
})

contextBridge.exposeInMainWorld('hmx', {
  getEmotion: () => {
    return ipcRenderer.invoke('get-emotion')
  }
})