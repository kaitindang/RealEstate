import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,

} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const Sidebar = () => {

  const author = () => {
    var role = localStorage.getItem("role");
    console.log(role);
    if (role == "ROLE_USER") {
      return "User"
    } else {
      return "Admin"
    }
  }

  return (
    <div className="sidebar"
      style={{ display: 'flex', height: '150vh', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            {author()}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Thông tin tài khoản</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/productlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Quản lý tin đăng</CDBSidebarMenuItem>
            </NavLink>
            {author() === "Admin" ?
              < NavLink exact to="/userList" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="sticky-note">Quản lý người dùng</CDBSidebarMenuItem>
              </NavLink>
              :
              <span></span>
            }
            {author() === "Admin" ?
              < NavLink exact to="/productApprove" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="sticky-note">Phê duyệt</CDBSidebarMenuItem>
              </NavLink>
              :
              <span></span>
            }



          </CDBSidebarMenu>

        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >

          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div >
  );
};

export default Sidebar;