import React from 'react'
import * as FaIcons from "react-icons/fa"
import { SideBarData } from './SideBarData'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

  const [sidebar, setSidebar] = useState(true);
  const showSideBar = () => setSidebar(!sidebar);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload(false);
  }
  return (
    <>
    <div className='bg-blue-900'>
      <div className='h-16 px-8 flex'>
        <Link to='#' className='menu-bars'>
          <FaIcons.FaBars size={40} className="mx-3 my-5" onClick={showSideBar} />
        </Link>
       
        <p className='text-white my-2 font-bold text-5xl'> Manage</p>

        


        <button onClick={() => logout()} className='bg-white rounded-md ml-auto h-6 mt-4'>Logout</button>

      </div>

    </div>

    <div>
       <nav className={sidebar ? 'nav-menu active hidden' : 'nav-menu bg-blue-900 ml-0 w-60 h-full justify-center fixed flex  text-2xl text-neutral-50'}>
          <ul className='nav-menu-items' onClick={showSideBar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'></Link>
            </li>
            {SideBarData.map((item,index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <a  className='hover:bg-black text-2xl'>{item.titile}</a>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
    </div>
    </>

  )
}

export default NavBar