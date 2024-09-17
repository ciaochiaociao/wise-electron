import { ReactNode } from 'react'

const Sidebar = ({ children } : {  children: ReactNode }) => {

  return (
    
    <div className='w-16'>
      <div className="sidebar fixed h-full shadow-md text-white">
        {children}
      </div>
    </div>
  )
}

export default Sidebar;