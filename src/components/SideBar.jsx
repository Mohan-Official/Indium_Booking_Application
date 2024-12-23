import { Calendar, FileSliders, HelpCircle, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import IndiumLogo from './../assets/image 1.svg';
import './sideBar.css';

export default function Sidebar() {
  return (
    <nav className='sidebar'>
      <div className='sidebar-logo'>
        <img src={IndiumLogo} alt='Indium logo' width={130} height={50} />
      </div>

      <div className='sidebar-section'>
        <div className='sidebar-section-title'>
          <p>General</p>
        </div>
        <button className='sidebar-nav-button'>
          <Calendar className='sidebar-icon' />
          Book Meeting
        </button>
        <button className='sidebar-nav-button'>
          <FileSliders className='sidebar-icon' />
          Admin
        </button>
      </div>

      <div className='sidebar-section'>
        <div className='sidebar-section-title'>Other</div>
        <Link to='/help-center' className='sidebar-nav-link'>
          <HelpCircle className='sidebar-icon' />
          Help & Center
        </Link>
        <Link to='/settings' className='sidebar-nav-link'>
          <Settings className='sidebar-icon' />
          Settings
        </Link>
      </div>
    </nav>
  );
}

// import React from 'react'

// export default function SideBar() {
//   return <div>SideBar</div>;
// }
