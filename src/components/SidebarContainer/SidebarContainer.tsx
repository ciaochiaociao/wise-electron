import { ReactNode } from 'react'

const SidebarContainer = ({ children } : {  children: ReactNode }) => {

  return (
    <div className="flex flex-row sidebar-container h-full shadow-md text-white">
      {children}
    </div>
  )
}

export default SidebarContainer;