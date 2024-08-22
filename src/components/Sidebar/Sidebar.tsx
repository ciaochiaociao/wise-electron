import { ReactNode } from 'react'

const Sidebar = ({ children } : {  children: ReactNode }) => {

  return (
    <div className="sidebar shadow-md bg-neutral-800 text-white">
      {children}
    </div>
  )
}

export default Sidebar;