import React from 'react'
import './TitleBar.css'

const TitleBar: React.FC = () => {
  return (
    <div className="title-bar">
      <div className="title">Wise Assistant</div>
      <div className="window-controls">
        <button className="minimize" onClick={() => window.ipcRenderer.send('minimize-window')}></button>
        <button className="maximize" onClick={() => window.ipcRenderer.send('maximize-window')}></button>
        <button className="close" onClick={() => window.ipcRenderer.send('close-window')}></button>
      </div>
    </div>
  )
}

export default TitleBar