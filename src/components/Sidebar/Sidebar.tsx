import React from 'react'
import './Sidebar.css'

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {children}
      </nav>
    </div>
  )
}

export default Sidebar