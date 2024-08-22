import { ReactNode } from 'react'

const Sidebar = ({ children } : {  children: ReactNode }) => {

  return (
    <div className="sidebar h-full shadow-md bg-gray-800 text-white">
      {children}
    </div>
  )
}

export default Sidebar;