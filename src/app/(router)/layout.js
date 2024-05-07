import React from 'react'
import SideNav from './_componets/sideNav'
import Header from './_componets/header'

function layout({children}) {
  return (
    <div>
        <div className='sm:w-64 fixed top-0 left-0 sm:block hidden h-screen '>
            <SideNav/>
        </div>
        <div className='sm:ml-64'>
        <div>
        <Header/>
        </div>
        <div className='mt-11 p-5'>
        {children}
        </div>
        </div>
    </div>
  )
}

export default layout