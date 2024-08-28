import { ReactNode } from 'react'

const Sidebar = ({ children } : {  children: ReactNode }) => {

  return (
    
    <div className='w-11'>
      <div className="sidebar fixed h-full shadow-md bg-neutral-800 text-white">
        {children}
      </div>
    </div>
  )
}

export default Sidebar;